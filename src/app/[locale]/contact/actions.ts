"use server";

import { headers } from "next/headers";
import {
  type ContactFormState,
  validateContactField,
} from "@/app/[locale]/contact/state";
import { profile } from "@/data/profile";
import { type Locale, isLocale } from "@/i18n/config";
import { Resend } from "resend";

function pickLocale(value: FormDataEntryValue | null): Locale {
  if (typeof value === "string" && isLocale(value)) {
    return value;
  }
  return "ja";
}

function readField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

// In-memory fixed-window rate limit. サーバレスではインスタンス単位だが、
// 単一インスタンスへの連投 (スパム・Resend クォータ浪費) には十分効く。
const RATE_LIMIT = { perIp: 3, global: 20, windowMs: 10 * 60_000 };
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function takeRateSlot(key: string, limit: number): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    return true;
  }
  if (bucket.count >= limit) return false;
  bucket.count += 1;
  return true;
}

async function isRateLimited(): Promise<boolean> {
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "unknown";
  if (!takeRateSlot("contact:global", RATE_LIMIT.global)) return true;
  return !takeRateSlot(`contact:ip:${ip}`, RATE_LIMIT.perIp);
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot — silently succeed for bots.
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return { status: "success", fieldErrors: {}, formError: null };
  }

  if (await isRateLimited()) {
    return { status: "error", fieldErrors: {}, formError: "rate" };
  }

  const locale = pickLocale(formData.get("locale"));
  const name = readField(formData, "name");
  const email = readField(formData, "email");
  const subject = readField(formData, "subject");
  const message = readField(formData, "message");

  const fieldErrors: ContactFormState["fieldErrors"] = {};
  if (!validateContactField("name", name)) fieldErrors.name = true;
  if (!validateContactField("email", email)) fieldErrors.email = true;
  if (!validateContactField("subject", subject)) fieldErrors.subject = true;
  if (!validateContactField("message", message)) fieldErrors.message = true;

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors, formError: null };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { status: "error", fieldErrors: {}, formError: "config" };
  }

  const to = process.env.RESEND_TO_EMAIL ?? profile.email;
  const from =
    process.env.RESEND_FROM_EMAIL ?? "Resume Contact <onboarding@resend.dev>";

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[Resume Contact] ${subject}`,
      text: [
        `Locale: ${locale}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return { status: "error", fieldErrors: {}, formError: "server" };
    }

    return { status: "success", fieldErrors: {}, formError: null };
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return { status: "error", fieldErrors: {}, formError: "server" };
  }
}
