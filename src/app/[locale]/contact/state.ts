export type ContactFieldError = "name" | "email" | "subject" | "message";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  fieldErrors: Partial<Record<ContactFieldError, true>>;
  formError: "server" | "config" | null;
};

export const initialContactState: ContactFormState = {
  status: "idle",
  fieldErrors: {},
  formError: null,
};
