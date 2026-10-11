import { describe, expect, it } from "vitest";
import { contentSecurityPolicy } from "@/lib/csp";

describe("contentSecurityPolicy", () => {
  const prod = contentSecurityPolicy();

  it("is the exact policy production serves before the Worker adds the nonce", () => {
    expect(prod).toBe(
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: blob:",
        "font-src 'self' data:",
        "connect-src 'self'",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
      ].join("; "),
    );
  });

  it("does not include a nonce (worker.ts adds one per HTML response)", () => {
    expect(prod).not.toContain("nonce-");
  });

  it("does not include 'strict-dynamic'", () => {
    // In CSP Level 3, 'strict-dynamic' makes 'self' be ignored: the
    // /_next/static chunks would then need nonces of their own.
    expect(prod).not.toContain("strict-dynamic");
    expect(contentSecurityPolicy({ dev: true })).not.toContain(
      "strict-dynamic",
    );
  });

  it("adds 'unsafe-eval' only in dev for HMR", () => {
    expect(prod).not.toContain("unsafe-eval");
    expect(contentSecurityPolicy({ dev: true })).toContain(
      "script-src 'self' 'unsafe-inline' 'unsafe-eval';",
    );
  });

  it("keeps the contact form's Server Action on this origin", () => {
    expect(prod).toContain("form-action 'self'");
    expect(prod).toContain("connect-src 'self';");
  });

  it("directives are separated by ; with no trailing ;", () => {
    expect(prod.endsWith(";")).toBe(false);
    expect(prod).not.toContain(";;");
  });
});
