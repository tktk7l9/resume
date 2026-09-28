"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import {
  type ContactFormState,
  type ContactFormValues,
  contactFields,
  emptyContactValues,
  normalizeContactField,
  validateContactField,
} from "@/app/[locale]/contact/state";
import { profile } from "@/data/profile";
import { isLocale, type Locale } from "@/i18n/config";

function pickLocale(value: FormDataEntryValue | null): Locale {
  if (typeof value === "string" && isLocale(value)) {
    return value;
  }
  return "ja";
}

function readValues(formData: FormData): ContactFormValues {
  const values = { ...emptyContactValues };
  for (const field of contactFields) {
    const raw = formData.get(field);
    values[field] =
      typeof raw === "string" ? normalizeContactField(field, raw) : "";
  }
  return values;
}

// In-memory fixed-window rate limit. The count is per isolate on Workers, so it is not a
// site-wide cap, but it does stop repeated posts to the same isolate instance.
// The IP comes from CF-Connecting-IP. The first X-Forwarded-For entry can be planted
// by the client, so it is not trusted (Cloudflare appends the connecting IP to an existing XFF).
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

function clientIp(h: Headers): string {
  const cf = h.get("cf-connecting-ip")?.trim();
  if (cf) return cf;
  const realIp = h.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const xff = h.get("x-forwarded-for");
  if (xff) {
    const hops = xff
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    const last = hops[hops.length - 1];
    if (last) return last;
  }
  return "unknown";
}

async function isRateLimited(): Promise<boolean> {
  const ip = clientIp(await headers());
  if (!takeRateSlot("contact:global", RATE_LIMIT.global)) return true;
  return !takeRateSlot(`contact:ip:${ip}`, RATE_LIMIT.perIp);
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = readValues(formData);

  // Honeypot — silently succeed for bots.
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return {
      status: "success",
      fieldErrors: {},
      formError: null,
      values: emptyContactValues,
    };
  }

  // Validate before rate limiting so typos never lock a visitor out.
  const fieldErrors: ContactFormState["fieldErrors"] = {};
  for (const field of contactFields) {
    if (!validateContactField(field, values[field])) fieldErrors[field] = true;
  }
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors, formError: null, values };
  }

  if (await isRateLimited()) {
    return { status: "error", fieldErrors: {}, formError: "rate", values };
  }

  const locale = pickLocale(formData.get("locale"));
  const { name, email, subject, message } = values;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { status: "error", fieldErrors: {}, formError: "config", values };
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
      return { status: "error", fieldErrors: {}, formError: "server", values };
    }

    return {
      status: "success",
      fieldErrors: {},
      formError: null,
      values: emptyContactValues,
    };
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return { status: "error", fieldErrors: {}, formError: "server", values };
  }
}
