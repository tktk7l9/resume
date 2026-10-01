"use client";

import { CheckCircle2Icon } from "lucide-react";
import {
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useFormStatus } from "react-dom";
import { submitContactForm } from "@/app/[locale]/contact/actions";
import {
  type ContactFieldError,
  type ContactFormState,
  contactFields,
  focusTargetAfterSubmit,
  initialContactState,
  validateContactField,
} from "@/app/[locale]/contact/state";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type ContactDict = Dictionary["contact"];

type ContactFormProps = {
  locale: Locale;
  dict: ContactDict;
  /** Fallback address shown when the form itself cannot send. */
  email: string;
};

type ClientErrors = Partial<Record<ContactFieldError, true>>;

type FieldConfig = {
  field: ContactFieldError;
  type: "text" | "email" | "textarea";
  maxLength: number;
  minLength?: number;
  autoComplete?: string;
  label: string;
  placeholder: string;
  error: string;
  hint?: string;
};

const inputBaseClass =
  "w-full min-h-11 rounded-md border bg-background px-3 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring";

function fieldClassName(hasError: boolean) {
  return `${inputBaseClass} ${
    hasError ? "border-red-500 focus:ring-red-500" : "border-border"
  }`;
}

function SubmitButton({ dict }: { dict: ContactDict }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-11 items-center justify-center rounded-md bg-foreground px-5 py-2 text-sm font-medium text-background transition-colors hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? dict.form.submitting : dict.form.submit}
    </button>
  );
}

export function ContactForm({ locale, dict, email }: ContactFormProps) {
  const [state, formAction] = useActionState<ContactFormState, FormData>(
    submitContactForm,
    initialContactState,
  );
  const [clientErrors, setClientErrors] = useState<ClientErrors>({});
  const baseId = useId();
  const formErrorId = useId();
  const idFor = (field: ContactFieldError) => `${baseId}-${field}`;
  const formErrorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLOutputElement>(null);

  // Runs once per server answer (each answer is a new state object).
  useEffect(() => {
    const target = focusTargetAfterSubmit(state);
    if (target === "formError") formErrorRef.current?.focus();
    else if (target === "success") successRef.current?.focus();
    else if (target) document.getElementById(`${baseId}-${target}`)?.focus();
  }, [state, baseId]);

  if (state.status === "success") {
    return (
      <output
        ref={successRef}
        tabIndex={-1}
        className="block rounded-lg border border-border bg-card p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2Icon
            className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
            aria-hidden="true"
          />
          <div className="space-y-2">
            <h2 className="text-base font-semibold text-foreground">
              {dict.success.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {dict.success.message}
            </p>
            <a
              href={`/${locale}/contact`}
              className="inline-flex min-h-11 items-center text-sm text-foreground underline underline-offset-4 hover:opacity-80"
            >
              {dict.success.sendAnother}
            </a>
          </div>
        </div>
      </output>
    );
  }

  const handleBlur =
    (field: ContactFieldError) =>
    (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const valid = validateContactField(field, event.currentTarget.value);
      setClientErrors((prev) => {
        if (valid) {
          if (!prev[field]) return prev;
          const next = { ...prev };
          delete next[field];
          return next;
        }
        if (prev[field]) return prev;
        return { ...prev, [field]: true };
      });
    };

  const handleChange =
    (field: ContactFieldError) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // Only clear errors as the user types — don't add new ones mid-typing.
      if (!clientErrors[field]) return;
      if (validateContactField(field, event.currentTarget.value)) {
        setClientErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    };

  // Catch mistakes before the round trip and move focus to the first one,
  // so the visitor sees what to fix without hunting for it.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const errors: ClientErrors = {};
    for (const field of contactFields) {
      const control = form.elements.namedItem(field);
      const value =
        control instanceof HTMLInputElement ||
        control instanceof HTMLTextAreaElement
          ? control.value
          : "";
      if (!validateContactField(field, value)) errors[field] = true;
    }
    const firstInvalid = contactFields.find((field) => errors[field]);
    if (!firstInvalid) return;
    event.preventDefault();
    setClientErrors(errors);
    const control = form.elements.namedItem(firstInvalid);
    if (control instanceof HTMLElement) control.focus();
  };

  const hasError = (field: ContactFieldError) =>
    Boolean(clientErrors[field] ?? state.fieldErrors[field]);

  const formErrorMessage =
    state.formError === "config"
      ? dict.errors.config
      : state.formError === "server"
        ? dict.errors.server
        : state.formError === "rate"
          ? dict.errors.rate
          : null;
  const offerDirectEmail =
    state.formError === "config" || state.formError === "server";

  const fields: FieldConfig[] = [
    {
      field: "name",
      type: "text",
      maxLength: 100,
      autoComplete: "name",
      label: dict.form.name,
      placeholder: dict.form.namePlaceholder,
      error: dict.errors.name,
    },
    {
      field: "email",
      type: "email",
      maxLength: 254,
      autoComplete: "email",
      label: dict.form.email,
      placeholder: dict.form.emailPlaceholder,
      error: dict.errors.email,
    },
    {
      field: "subject",
      type: "text",
      maxLength: 150,
      label: dict.form.subject,
      placeholder: dict.form.subjectPlaceholder,
      error: dict.errors.subject,
    },
    {
      field: "message",
      type: "textarea",
      maxLength: 5000,
      minLength: 10,
      label: dict.form.message,
      placeholder: dict.form.messagePlaceholder,
      error: dict.errors.message,
      hint: dict.form.messageHint,
    },
  ];

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
    >
      <input type="hidden" name="locale" value={locale} />
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {fields.map((config) => {
        const id = idFor(config.field);
        const invalid = hasError(config.field);
        const errorId = `${id}-error`;
        const common = {
          id,
          name: config.field,
          required: true,
          maxLength: config.maxLength,
          placeholder: config.placeholder,
          // Echoed back by the action so a failed send keeps the input.
          defaultValue: state.values[config.field],
          onBlur: handleBlur(config.field),
          onChange: handleChange(config.field),
          "aria-invalid": invalid ? ("true" as const) : undefined,
          "aria-describedby": invalid ? errorId : undefined,
        };
        return (
          <div key={config.field} className="space-y-1.5">
            <label
              htmlFor={id}
              className="block text-sm font-medium text-foreground"
            >
              {config.label}
              <span className="ml-1 text-xs text-muted-foreground">
                ({dict.form.required}
                {config.hint ? ` · ${config.hint}` : ""})
              </span>
            </label>
            {config.type === "textarea" ? (
              <textarea
                {...common}
                minLength={config.minLength}
                rows={7}
                className={`${fieldClassName(invalid)} resize-y`}
              />
            ) : (
              <input
                {...common}
                type={config.type}
                autoComplete={config.autoComplete}
                className={fieldClassName(invalid)}
              />
            )}
            {invalid && (
              <p id={errorId} className="text-xs text-red-700">
                {config.error}
              </p>
            )}
          </div>
        );
      })}

      {formErrorMessage && (
        <div
          id={formErrorId}
          ref={formErrorRef}
          tabIndex={-1}
          role="alert"
          className="space-y-1 rounded-md border border-red-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 bg-red-500/5 px-3 py-2 text-sm text-red-700"
        >
          <p>{formErrorMessage}</p>
          {offerDirectEmail && (
            <p>
              <a
                href={`mailto:${email}`}
                className="font-medium underline underline-offset-4 [overflow-wrap:anywhere]"
              >
                {email}
              </a>
            </p>
          )}
        </div>
      )}

      <div>
        <SubmitButton dict={dict} />
      </div>
    </form>
  );
}
