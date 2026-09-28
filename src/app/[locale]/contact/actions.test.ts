import { beforeEach, describe, expect, it, vi } from "vitest";

const headerStore = new Map<string, string>();
vi.mock("next/headers", () => ({
  headers: async () => ({
    get: (key: string) => headerStore.get(key) ?? null,
  }),
}));

const send = vi.fn();
vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

async function loadAction() {
  vi.resetModules();
  const mod = await import("@/app/[locale]/contact/actions");
  const { initialContactState } = await import("@/app/[locale]/contact/state");
  return (form: Record<string, string>) => {
    const fd = new FormData();
    for (const [k, v] of Object.entries(form)) fd.set(k, v);
    return mod.submitContactForm(initialContactState, fd);
  };
}

const valid = {
  locale: "ja",
  name: "山田 太郎",
  email: "yamada@example.com",
  subject: "ご相談",
  message: "これは十分に長いメッセージ本文です。",
};

beforeEach(() => {
  headerStore.clear();
  headerStore.set("cf-connecting-ip", "203.0.113.7");
  send.mockReset();
  send.mockResolvedValue({ error: null });
  vi.stubEnv("RESEND_API_KEY", "test-key");
});

describe("submitContactForm", () => {
  it("does not spend the rate limit on invalid submissions", async () => {
    const submit = await loadAction();
    for (let i = 0; i < 5; i++) {
      const res = await submit({ ...valid, message: "短い" });
      expect(res.fieldErrors.message).toBe(true);
      expect(res.formError).toBeNull();
    }
    const res = await submit(valid);
    expect(res.status).toBe("success");
  });

  it("echoes the submitted values back on a field error", async () => {
    const submit = await loadAction();
    const res = await submit({ ...valid, message: "短い" });
    expect(res.values).toEqual({
      name: valid.name,
      email: valid.email,
      subject: valid.subject,
      message: "短い",
    });
  });

  it("echoes the submitted values back when sending fails", async () => {
    send.mockResolvedValue({ error: { message: "boom" } });
    vi.spyOn(console, "error").mockImplementation(() => {});
    const submit = await loadAction();
    const res = await submit(valid);
    expect(res.formError).toBe("server");
    expect(res.values.message).toBe(valid.message);
  });

  it("echoes the submitted values back when mail is not configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const submit = await loadAction();
    const res = await submit(valid);
    expect(res.formError).toBe("config");
    expect(res.values.subject).toBe(valid.subject);
  });

  it("normalizes a full-width email before sending", async () => {
    const submit = await loadAction();
    const res = await submit({ ...valid, email: "ｙａｍａｄａ＠example.com" });
    expect(res.status).toBe("success");
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({ replyTo: "yamada@example.com" }),
    );
  });

  it("still rate-limits repeated valid submissions", async () => {
    const submit = await loadAction();
    for (let i = 0; i < 3; i++) {
      expect((await submit(valid)).status).toBe("success");
    }
    const res = await submit(valid);
    expect(res.formError).toBe("rate");
    expect(res.values.name).toBe(valid.name);
  });
});
