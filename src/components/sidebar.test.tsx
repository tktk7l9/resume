import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Sidebar } from "@/components/sidebar";
import { profile } from "@/data/profile";
import en from "@/i18n/dictionaries/en";
import ja from "@/i18n/dictionaries/ja";

describe("Sidebar", () => {
  it("wraps everything in a named navigation landmark", () => {
    render(<Sidebar locale="ja" dict={ja} />);
    expect(screen.getByRole("navigation", { name: ja.nav.toc })).toBeVisible();
  });

  it("lists the four sections in order, under the locale path", () => {
    render(<Sidebar locale="ja" dict={ja} />);
    const nav = screen.getByRole("navigation");
    const list = within(nav).getByRole("list");
    const links = within(list).getAllByRole("link");
    expect(links.map((l) => l.textContent)).toEqual([
      ja.nav.about,
      ja.nav.timeline,
      ja.nav.projects,
      ja.nav.skills,
    ]);
    expect(links.map((l) => l.getAttribute("href"))).toEqual([
      "/ja#about",
      "/ja#timeline",
      "/ja#projects",
      "/ja#skills",
    ]);
  });

  it("shows the address and a contact link (desktop and mobile copies)", () => {
    render(<Sidebar locale="en" dict={en} />);
    expect(screen.getAllByText(profile.address.en)).toHaveLength(2);
    const contactLinks = screen.getAllByRole("link", {
      name: en.contact.pageTitle,
    });
    expect(contactLinks).toHaveLength(2);
    for (const link of contactLinks) {
      expect(link).toHaveAttribute("href", "/en/contact");
    }
  });

  it("links to GitHub, LinkedIn and the portfolio in a new tab", () => {
    render(<Sidebar locale="ja" dict={ja} />);
    for (const [name, href] of [
      ["GitHub", profile.githubUrl],
      ["LinkedIn", profile.linkedinUrl],
      [ja.nav.portfolio, profile.portfolioUrl],
    ] as const) {
      const links = screen.getAllByRole("link", {
        name: `${name}${ja.nav.opensInNewTab}`,
      });
      expect(links).toHaveLength(2);
      for (const link of links) {
        expect(link).toHaveAttribute("href", href);
        expect(link).toHaveAttribute("target", "_blank");
      }
    }
  });
});
