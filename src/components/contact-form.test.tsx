import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  type ContactFormState,
  initialContactState,
} from "@/app/[locale]/contact/state";
import { ContactForm } from "@/components/contact-form";
import en from "@/i18n/dictionaries/en";
import ja from "@/i18n/dictionaries/ja";

const submitContactForm =
  vi.fn<
    (prev: ContactFormState, formData: FormData) => Promise<ContactFormState>
  >();

vi.mock("@/app/[locale]/contact/actions", () => ({
  submitContactForm: (prev: ContactFormState, formData: FormData) =>
    submitContactForm(prev, formData),
}));

const email = "hello@example.com";

const valid = {
  name: "山田 太郎",
  email: "yamada@example.com",
  subject: "ご相談",
  message: "これは十分に長いメッセージ本文です。",
};

function renderForm(locale: "ja" | "en" = "ja") {
  const dict = locale === "ja" ? ja.contact : en.contact;
  const user = userEvent.setup();
  render(<ContactForm locale={locale} dict={dict} email={email} />);
  const field = (label: string) =>
    screen.getByRole("textbox", { name: new RegExp(label) });
  return {
    user,
    dict,
    name: () => field(dict.form.name),
    email: () => field(dict.form.email),
    subject: () => field(dict.form.subject),
    message: () => field(dict.form.message),
    submit: () => screen.getByRole("button", { name: dict.form.submit }),
  };
}

async function fillValid(f: ReturnType<typeof renderForm>) {
  await f.user.type(f.name(), valid.name);
  await f.user.type(f.email(), valid.email);
  await f.user.type(f.subject(), valid.subject);
  await f.user.type(f.message(), valid.message);
}

function serverState(patch: Partial<ContactFormState>): ContactFormState {
  return { ...initialContactState, status: "error", values: valid, ...patch };
}

beforeEach(() => {
  submitContactForm.mockReset();
  submitContactForm.mockResolvedValue({
    ...initialContactState,
    status: "success",
  });
});

describe("ContactForm layout", () => {
  it("labels every field as required and shows the message-length hint", () => {
    const f = renderForm();
    for (const control of [f.name(), f.email(), f.subject(), f.message()]) {
      expect(control).toBeRequired();
      expect(control).not.toHaveAttribute("aria-invalid");
    }
    expect(f.message()).toHaveAccessibleName(
      expect.stringContaining(ja.contact.form.messageHint),
    );
    expect(f.email()).toHaveAttribute("type", "email");
    expect(f.email()).toHaveAttribute("autocomplete", "email");
    expect(f.submit()).toBeEnabled();
  });

  it("keeps the honeypot out of the accessibility tree and tab order", () => {
    renderForm();
    const honeypot = document.querySelector<HTMLInputElement>(
      'input[name="website"]',
    );
    expect(honeypot).not.toBeNull();
    expect(honeypot).toHaveAttribute("tabindex", "-1");
    expect(honeypot?.closest("[aria-hidden='true']")).not.toBeNull();
    expect(screen.queryByRole("textbox", { name: /Leave this field/ })).toBe(
      null,
    );
  });

  it("carries the page locale as a hidden field", () => {
    renderForm("en");
    expect(
      document.querySelector<HTMLInputElement>('input[name="locale"]')?.value,
    ).toBe("en");
  });
});

describe("ContactForm client validation", () => {
  it("flags an empty field on blur and points the field at its message", async () => {
    const f = renderForm();
    await f.user.click(f.name());
    await f.user.tab();

    const nameField = f.name();
    expect(nameField).toHaveAttribute("aria-invalid", "true");
    expect(nameField).toHaveAccessibleDescription(ja.contact.errors.name);
    expect(screen.getByText(ja.contact.errors.name)).toBeVisible();
    // Only the blurred field is flagged; the others stay quiet.
    expect(f.email()).not.toHaveAttribute("aria-invalid");
  });

  it("does not flag a valid field on blur", async () => {
    const f = renderForm();
    await f.user.type(f.email(), "ｙａｍａｄａ＠example.com");
    await f.user.tab();
    expect(f.email()).not.toHaveAttribute("aria-invalid");
    expect(screen.queryByText(ja.contact.errors.email)).toBeNull();
  });

  it("clears the error as soon as the visitor types a valid value", async () => {
    const f = renderForm();
    await f.user.click(f.message());
    await f.user.tab();
    expect(screen.getByText(ja.contact.errors.message)).toBeVisible();

    await f.user.type(f.message(), "短い");
    // Still too short: the message stays.
    expect(screen.getByText(ja.contact.errors.message)).toBeVisible();

    await f.user.type(f.message(), "がようやく10文字を超えた");
    expect(screen.queryByText(ja.contact.errors.message)).toBeNull();
    expect(f.message()).not.toHaveAttribute("aria-invalid");
  });

  it("does not add an error while typing in a field that was never blurred", async () => {
    const f = renderForm();
    await f.user.type(f.email(), "not-an-email");
    expect(f.email()).not.toHaveAttribute("aria-invalid");
  });

  it("blocks submission, shows every error and focuses the first invalid field", async () => {
    const f = renderForm();
    await f.user.type(f.name(), valid.name);
    await f.user.type(f.email(), "nope");
    await f.user.click(f.submit());

    expect(submitContactForm).not.toHaveBeenCalled();
    expect(f.name()).not.toHaveAttribute("aria-invalid");
    expect(f.email()).toHaveAttribute("aria-invalid", "true");
    expect(f.subject()).toHaveAttribute("aria-invalid", "true");
    expect(f.message()).toHaveAttribute("aria-invalid", "true");
    expect(f.email()).toHaveFocus();
    expect(screen.getByText(ja.contact.errors.email)).toBeVisible();
    expect(screen.getByText(ja.contact.errors.subject)).toBeVisible();
    expect(screen.getByText(ja.contact.errors.message)).toBeVisible();
  });
});

describe("ContactForm submission", () => {
  it("sends the typed values and the locale to the action", async () => {
    const f = renderForm();
    await fillValid(f);
    await f.user.click(f.submit());

    await waitFor(() => expect(submitContactForm).toHaveBeenCalledTimes(1));
    const formData = submitContactForm.mock.calls[0]?.[1];
    expect(formData).toBeInstanceOf(FormData);
    expect(Object.fromEntries(formData as FormData)).toEqual({
      locale: "ja",
      website: "",
      ...valid,
    });
  });

  it("disables the button and shows the sending label while pending", async () => {
    let resolve: (state: ContactFormState) => void = () => {};
    submitContactForm.mockImplementation(
      () =>
        new Promise<ContactFormState>((r) => {
          resolve = r;
        }),
    );
    const f = renderForm();
    await fillValid(f);
    await f.user.click(f.submit());

    const pendingButton = await screen.findByRole("button", {
      name: ja.contact.form.submitting,
    });
    expect(pendingButton).toBeDisabled();

    resolve({ ...initialContactState, status: "success" });
    expect(
      await screen.findByRole("heading", { name: ja.contact.success.title }),
    ).toBeVisible();
  });

  it("replaces the form with a confirmation that offers to send another", async () => {
    const f = renderForm("en");
    await fillValid(f);
    await f.user.click(f.submit());

    const status = await screen.findByRole("status");
    expect(status).toHaveTextContent(en.contact.success.title);
    expect(status).toHaveTextContent(en.contact.success.message);
    expect(
      screen.getByRole("link", { name: en.contact.success.sendAnother }),
    ).toHaveAttribute("href", "/en/contact");
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("shows server-side field errors, keeps the input and focuses the first bad field", async () => {
    submitContactForm.mockResolvedValue(
      serverState({ fieldErrors: { subject: true, message: true } }),
    );
    const f = renderForm();
    await fillValid(f);
    await f.user.click(f.submit());

    await waitFor(() =>
      expect(f.subject()).toHaveAttribute("aria-invalid", "true"),
    );
    expect(f.subject()).toHaveFocus();
    expect(f.message()).toHaveAttribute("aria-invalid", "true");
    expect(f.name()).not.toHaveAttribute("aria-invalid");
    expect(screen.getByText(ja.contact.errors.subject)).toBeVisible();
    expect(f.message()).toHaveValue(valid.message);
  });

  it("lets the visitor clear a server-side field error by fixing the value", async () => {
    submitContactForm.mockResolvedValue(
      serverState({ fieldErrors: { subject: true } }),
    );
    const f = renderForm();
    await fillValid(f);
    await f.user.click(f.submit());
    await waitFor(() =>
      expect(f.subject()).toHaveAttribute("aria-invalid", "true"),
    );

    await f.user.clear(f.subject());
    await f.user.type(f.subject(), "別の件名");
    expect(f.subject()).not.toHaveAttribute("aria-invalid");
    expect(screen.queryByText(ja.contact.errors.subject)).toBeNull();

    // Leaving it empty again brings the error back.
    await f.user.clear(f.subject());
    await f.user.tab();
    expect(f.subject()).toHaveAttribute("aria-invalid", "true");
  });

  it("explains a send failure, offers the direct address and focuses the alert", async () => {
    submitContactForm.mockResolvedValue(serverState({ formError: "server" }));
    const f = renderForm();
    await fillValid(f);
    await f.user.click(f.submit());

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(ja.contact.errors.server);
    expect(alert).toHaveFocus();
    expect(screen.getByRole("link", { name: email })).toHaveAttribute(
      "href",
      `mailto:${email}`,
    );
    expect(f.name()).toHaveValue(valid.name);
    expect(f.submit()).toBeEnabled();
  });

  it("offers the direct address when mail is not configured", async () => {
    submitContactForm.mockResolvedValue(serverState({ formError: "config" }));
    const f = renderForm("en");
    await fillValid(f);
    await f.user.click(f.submit());

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(en.contact.errors.config);
    expect(screen.getByRole("link", { name: email })).toBeVisible();
  });

  it("asks the visitor to wait when rate-limited, without a mailto escape", async () => {
    submitContactForm.mockResolvedValue(serverState({ formError: "rate" }));
    const f = renderForm();
    await fillValid(f);
    await f.user.click(f.submit());

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(ja.contact.errors.rate);
    expect(screen.queryByRole("link", { name: email })).toBeNull();
  });
});
