import { screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LocaleLayout, {
  generateMetadata,
  generateStaticParams,
} from "@/app/[locale]/layout";
import { profile } from "@/data/profile";
import en from "@/i18n/dictionaries/en";
import ja from "@/i18n/dictionaries/ja";
import { siteUrl } from "@/lib/site";
import { localeParams, renderAsync } from "@/test/render-async";

const notFound = vi.fn(() => {
  throw new Error("NEXT_NOT_FOUND");
});
vi.mock("next/navigation", () => ({
  notFound: () => notFound(),
  usePathname: () => "/ja",
}));

function layout(locale: string) {
  return LocaleLayout({ children: <p>本文</p>, ...localeParams(locale) });
}

describe("locale layout", () => {
  it("prerenders both locales", () => {
    expect(generateStaticParams()).toEqual([
      { locale: "ja" },
      { locale: "en" },
    ]);
  });

  it("frames the page with header, sidebar, main and footer", async () => {
    await renderAsync(layout("ja"));
    expect(screen.getByRole("banner")).toBeVisible();
    expect(screen.getByRole("navigation", { name: ja.nav.toc })).toBeVisible();
    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "main");
    expect(within(main).getByText("本文")).toBeVisible();
    expect(screen.getByRole("contentinfo")).toBeVisible();
  });

  it("offers a skip link to the main content", async () => {
    await renderAsync(layout("en"));
    expect(
      screen.getByRole("link", { name: en.nav.skipToContent }),
    ).toHaveAttribute("href", "#main");
  });

  it("marks the page language and embeds Person structured data", async () => {
    const { container } = await renderAsync(layout("en"));
    expect(container.querySelector("[lang='en']")).not.toBeNull();
    const script = container.querySelector(
      "script[type='application/ld+json']",
    );
    const data = JSON.parse(script?.textContent ?? "{}");
    expect(data).toMatchObject({
      "@type": "Person",
      name: profile.fullName.en,
      alternateName: profile.fullName.ja,
      url: `${siteUrl}/en`,
      jobTitle: en.meta.headline,
      sameAs: [profile.githubUrl, profile.linkedinUrl, profile.portfolioUrl],
    });
  });

  it("404s for an unknown locale", async () => {
    await expect(layout("fr")).rejects.toThrow("NEXT_NOT_FOUND");
  });
});

describe("locale layout metadata", () => {
  it("points canonical and alternates at the locale roots", async () => {
    const meta = await generateMetadata(localeParams("ja"));
    expect(meta.title).toBe(ja.meta.title);
    expect(meta.alternates).toEqual({
      canonical: "/ja",
      languages: { ja: "/ja", en: "/en" },
    });
    expect(meta.openGraph).toMatchObject({
      locale: "ja_JP",
      url: `${siteUrl}/ja`,
    });
  });

  it("uses the English OG locale for /en", async () => {
    const meta = await generateMetadata(localeParams("en"));
    expect(meta.openGraph).toMatchObject({ locale: "en_US" });
    expect(meta.description).toBe(en.meta.description);
  });

  it("returns nothing for an unknown locale", async () => {
    expect(await generateMetadata(localeParams("fr"))).toEqual({});
  });
});
