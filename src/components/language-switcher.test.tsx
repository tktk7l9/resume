import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LanguageSwitcher } from "@/components/language-switcher";

const usePathname = vi.fn<() => string | null>();
vi.mock("next/navigation", () => ({ usePathname: () => usePathname() }));

beforeEach(() => usePathname.mockReturnValue("/ja"));

describe("LanguageSwitcher", () => {
  it("offers the other language on the same page", () => {
    usePathname.mockReturnValue("/ja/contact");
    render(
      <LanguageSwitcher
        locale="ja"
        label="English"
        ariaLabel="Switch to English"
      />,
    );
    const link = screen.getByRole("link", { name: "Switch to English" });
    expect(link).toHaveAttribute("href", "/en/contact");
    expect(link).toHaveAttribute("hreflang", "en");
    // The label is written in the target language.
    expect(link).toHaveAttribute("lang", "en");
    expect(link).toHaveTextContent("English");
  });

  it("switches back to Japanese from the English top page", () => {
    usePathname.mockReturnValue("/en");
    render(
      <LanguageSwitcher
        locale="en"
        label="日本語"
        ariaLabel="日本語に切り替え"
      />,
    );
    const link = screen.getByRole("link", { name: "日本語に切り替え" });
    expect(link).toHaveAttribute("href", "/ja");
    expect(link).toHaveAttribute("lang", "ja");
  });

  it("falls back to the other locale's top page when the path is unknown", () => {
    usePathname.mockReturnValue(null);
    render(
      <LanguageSwitcher
        locale="ja"
        label="English"
        ariaLabel="Switch to English"
      />,
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", "/en");
  });
});
