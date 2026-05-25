"use client";

import { submitContactForm } from "@/app/[locale]/contact/actions";
import {
  type ContactFormState,
  initialContactState,
} from "@/app/[locale]/contact/state";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { CheckCircle2Icon } from "lucide-react";
import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";

type ContactDict = Dictionary["contact"];

type ContactFormProps = {
  locale: Locale;
  dict: ContactDict;
};

const inputBaseClass =
  "w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring";

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
      className="inline-flex items-center justify-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? dict.form.submitting : dict.form.submit}
    </button>
  );
}

export function ContactForm({ locale, dict }: ContactFormProps) {
  const [state, formAction] = useActionState<ContactFormState, FormData>(
    submitContactForm,
    initialContactState,
  );
  const nameId = useId();
  const emailId = useId();
  const subjectId = useId();
  const messageId = useId();
  const formErrorId = useId();

  if (state.status === "success") {
    return (
      <output
        className="block rounded-lg border border-border bg-card p-6"
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
              className="inline-block text-sm text-foreground underline underline-offset-4 hover:opacity-80"
            >
              {dict.success.sendAnother}
            </a>
          </div>
        </div>
      </output>
    );
  }

  const formErrorMessage =
    state.formError === "config"
      ? dict.errors.config
      : state.formError === "server"
        ? dict.errors.server
        : null;

  return (
    <form action={formAction} noValidate className="space-y-5">
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

      <div className="space-y-1.5">
        <label
          htmlFor={nameId}
          className="block text-sm font-medium text-foreground"
        >
          {dict.form.name}
          <span className="ml-1 text-xs text-muted-foreground">
            ({dict.form.required})
          </span>
        </label>
        <input
          id={nameId}
          type="text"
          name="name"
          required
          maxLength={100}
          autoComplete="name"
          placeholder={dict.form.namePlaceholder}
          aria-invalid={state.fieldErrors.name ? "true" : undefined}
          aria-describedby={
            state.fieldErrors.name ? `${nameId}-error` : undefined
          }
          className={fieldClassName(Boolean(state.fieldErrors.name))}
        />
        {state.fieldErrors.name && (
          <p id={`${nameId}-error`} className="text-xs text-red-600">
            {dict.errors.name}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor={emailId}
          className="block text-sm font-medium text-foreground"
        >
          {dict.form.email}
          <span className="ml-1 text-xs text-muted-foreground">
            ({dict.form.required})
          </span>
        </label>
        <input
          id={emailId}
          type="email"
          name="email"
          required
          maxLength={254}
          autoComplete="email"
          placeholder={dict.form.emailPlaceholder}
          aria-invalid={state.fieldErrors.email ? "true" : undefined}
          aria-describedby={
            state.fieldErrors.email ? `${emailId}-error` : undefined
          }
          className={fieldClassName(Boolean(state.fieldErrors.email))}
        />
        {state.fieldErrors.email && (
          <p id={`${emailId}-error`} className="text-xs text-red-600">
            {dict.errors.email}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor={subjectId}
          className="block text-sm font-medium text-foreground"
        >
          {dict.form.subject}
          <span className="ml-1 text-xs text-muted-foreground">
            ({dict.form.required})
          </span>
        </label>
        <input
          id={subjectId}
          type="text"
          name="subject"
          required
          maxLength={150}
          placeholder={dict.form.subjectPlaceholder}
          aria-invalid={state.fieldErrors.subject ? "true" : undefined}
          aria-describedby={
            state.fieldErrors.subject ? `${subjectId}-error` : undefined
          }
          className={fieldClassName(Boolean(state.fieldErrors.subject))}
        />
        {state.fieldErrors.subject && (
          <p id={`${subjectId}-error`} className="text-xs text-red-600">
            {dict.errors.subject}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor={messageId}
          className="block text-sm font-medium text-foreground"
        >
          {dict.form.message}
          <span className="ml-1 text-xs text-muted-foreground">
            ({dict.form.required})
          </span>
        </label>
        <textarea
          id={messageId}
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={7}
          placeholder={dict.form.messagePlaceholder}
          aria-invalid={state.fieldErrors.message ? "true" : undefined}
          aria-describedby={
            state.fieldErrors.message ? `${messageId}-error` : undefined
          }
          className={`${fieldClassName(Boolean(state.fieldErrors.message))} resize-y`}
        />
        {state.fieldErrors.message && (
          <p id={`${messageId}-error`} className="text-xs text-red-600">
            {dict.errors.message}
          </p>
        )}
      </div>

      {formErrorMessage && (
        <p
          id={formErrorId}
          role="alert"
          className="rounded-md border border-red-500/40 bg-red-500/5 px-3 py-2 text-sm text-red-700"
        >
          {formErrorMessage}
        </p>
      )}

      <div>
        <SubmitButton dict={dict} />
      </div>
    </form>
  );
}
