export type ContactFieldError = "name" | "email" | "subject" | "message";

export type ContactFormValues = Record<ContactFieldError, string>;

export type ContactFormState = {
  status: "idle" | "success" | "error";
  fieldErrors: Partial<Record<ContactFieldError, true>>;
  formError: "server" | "config" | "rate" | null;
  /** What the visitor submitted, so a failed send never wipes their message. */
  values: ContactFormValues;
};

export const contactFields: readonly ContactFieldError[] = [
  "name",
  "email",
  "subject",
  "message",
];

export const emptyContactValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export const initialContactState: ContactFormState = {
  status: "idle",
  fieldErrors: {},
  formError: null,
  values: emptyContactValues,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Trim every field; fold full-width characters in the email address
 * (e.g. "ｙａｍａｄａ＠example.com") so an IME-typed address still works.
 */
export function normalizeContactField(
  field: ContactFieldError,
  rawValue: string,
): string {
  const value = rawValue.trim();
  return field === "email"
    ? value.normalize("NFKC").replace(/\s+/g, "")
    : value;
}

export function validateContactField(
  field: ContactFieldError,
  rawValue: string,
): boolean {
  const value = normalizeContactField(field, rawValue);
  switch (field) {
    case "name":
      return value.length > 0 && value.length <= 100;
    case "email":
      return value.length > 0 && value.length <= 254 && EMAIL_RE.test(value);
    case "subject":
      return value.length > 0 && value.length <= 150;
    case "message":
      return value.length >= 10 && value.length <= 5000;
  }
}

/**
 * Where keyboard focus should land after the server answers. The submit
 * button is disabled while pending, so the browser drops focus to <body>;
 * without this a keyboard user would restart from the top of the page.
 * On success the whole form is replaced by the confirmation, which needs
 * focus for the same reason (SHIG 12, 66, 94).
 */
export function focusTargetAfterSubmit(
  state: ContactFormState,
): ContactFieldError | "formError" | "success" | null {
  if (state.status === "success") return "success";
  if (state.status !== "error") return null;
  const firstInvalid = contactFields.find((field) => state.fieldErrors[field]);
  if (firstInvalid) return firstInvalid;
  return state.formError ? "formError" : null;
}
