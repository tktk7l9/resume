import { describe, expect, it } from "vitest";
import { switchLocalePath } from "@/lib/locale-path";

describe("switchLocalePath", () => {
  it("keeps the current page when switching language", () => {
    expect(switchLocalePath("/ja/contact", "en")).toBe("/en/contact");
    expect(switchLocalePath("/en/contact", "ja")).toBe("/ja/contact");
  });

  it("switches the top page", () => {
    expect(switchLocalePath("/ja", "en")).toBe("/en");
    expect(switchLocalePath("/en/", "ja")).toBe("/ja/");
  });

  it("falls back to the locale top for unknown or empty paths", () => {
    expect(switchLocalePath("/", "en")).toBe("/en");
    expect(switchLocalePath(null, "ja")).toBe("/ja");
    expect(switchLocalePath("/fr/contact", "en")).toBe("/en");
  });
});
