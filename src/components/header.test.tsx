import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Header } from "@/components/header";
import { profile } from "@/data/profile";
import en from "@/i18n/dictionaries/en";
import ja from "@/i18n/dictionaries/ja";

vi.mock("next/navigation", () => ({ usePathname: () => "/ja" }));

describe("Header", () => {
  it("shows the name as a link home with the headline under it", () => {
    render(<Header locale="ja" dict={ja} />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(
      within(heading).getByRole("link", { name: profile.fullName.ja }),
    ).toHaveAttribute("href", "/ja");
    expect(screen.getByText(ja.meta.headline)).toBeVisible();
  });

  it("links to contact, GitHub, LinkedIn and the portfolio with names", () => {
    render(<Header locale="en" dict={en} />);
    expect(
      screen.getByRole("link", { name: en.contact.pageTitle }),
    ).toHaveAttribute("href", "/en/contact");
    const github = screen.getByRole("link", { name: "GitHub" });
    expect(github).toHaveAttribute("href", profile.githubUrl);
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      profile.linkedinUrl,
    );
    expect(
      screen.getByRole("link", { name: en.nav.portfolio }),
    ).toHaveAttribute("href", profile.portfolioUrl);
  });

  it("includes the language switcher", () => {
    render(<Header locale="ja" dict={ja} />);
    expect(
      screen.getByRole("link", { name: ja.header.switchLanguageAria }),
    ).toHaveTextContent(ja.header.switchLanguage);
  });
});
