import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RootLayout, { metadata } from "@/app/layout";
import RootRedirect from "@/app/page";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { siteUrl } from "@/lib/site";

const redirect = vi.fn((_to: string) => {
  throw new Error("NEXT_REDIRECT");
});
vi.mock("next/navigation", () => ({
  redirect: (to: string) => redirect(to),
}));

describe("root page", () => {
  it("redirects to the default locale", () => {
    expect(() => RootRedirect()).toThrow("NEXT_REDIRECT");
    expect(redirect).toHaveBeenCalledWith("/ja");
  });
});

describe("root layout", () => {
  it("sets metadataBase so OG image URLs are absolute", () => {
    expect(String(metadata.metadataBase)).toBe(`${siteUrl}/`);
  });

  it("renders children inside the document body", () => {
    // jsdom rejects nested <html>, so read the element tree without mounting it.
    const tree = RootLayout({ children: <p>child</p> });
    expect(tree.props.lang).toBe("ja");
    render(tree.props.children.props.children);
    expect(screen.getByText("child")).toBeVisible();
  });
});

describe("robots", () => {
  it("allows everything and points at the sitemap", () => {
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: `${siteUrl}/sitemap.xml`,
      host: siteUrl,
    });
  });
});

describe("sitemap", () => {
  it("lists the résumé and contact page for both locales with alternates", () => {
    const entries = sitemap();
    expect(entries.map((e) => e.url)).toEqual([
      `${siteUrl}/ja`,
      `${siteUrl}/en`,
      `${siteUrl}/ja/contact`,
      `${siteUrl}/en/contact`,
    ]);
    expect(entries[0]?.alternates?.languages).toEqual({
      ja: `${siteUrl}/ja`,
      en: `${siteUrl}/en`,
    });
    expect(entries[3]?.priority).toBe(0.5);
  });
});
