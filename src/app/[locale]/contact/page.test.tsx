import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ContactPage, {
  generateMetadata,
  generateStaticParams,
} from "@/app/[locale]/contact/page";
import en from "@/i18n/dictionaries/en";
import ja from "@/i18n/dictionaries/ja";
import { siteUrl } from "@/lib/site";
import { localeParams, renderAsync } from "@/test/render-async";

const notFound = vi.fn(() => {
  throw new Error("NEXT_NOT_FOUND");
});
vi.mock("next/navigation", () => ({ notFound: () => notFound() }));
vi.mock("@/app/[locale]/contact/actions", () => ({
  submitContactForm: vi.fn(),
}));

describe("contact page", () => {
  it("prerenders both locales", () => {
    expect(generateStaticParams()).toEqual([
      { locale: "ja" },
      { locale: "en" },
    ]);
  });

  it("shows the heading, description, form and a way back", async () => {
    await renderAsync(ContactPage(localeParams("ja")));
    expect(
      screen.getByRole("heading", { level: 2, name: ja.contact.pageTitle }),
    ).toBeVisible();
    expect(screen.getByText(ja.contact.description)).toBeVisible();
    expect(
      screen.getByRole("textbox", { name: new RegExp(ja.contact.form.name) }),
    ).toBeVisible();
    expect(
      screen.getByRole("button", { name: ja.contact.form.submit }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: ja.contact.backToResume }),
    ).toHaveAttribute("href", "/ja");
  });

  it("renders in English under /en", async () => {
    await renderAsync(ContactPage(localeParams("en")));
    expect(
      screen.getByRole("link", { name: en.contact.backToResume }),
    ).toHaveAttribute("href", "/en");
  });

  it("404s for an unknown locale", async () => {
    await expect(ContactPage(localeParams("fr"))).rejects.toThrow(
      "NEXT_NOT_FOUND",
    );
  });
});

describe("contact page metadata", () => {
  it("uses the contact title and canonical per locale", async () => {
    const meta = await generateMetadata(localeParams("en"));
    expect(meta.title).toBe(en.contact.metaTitle);
    expect(meta.alternates).toEqual({
      canonical: "/en/contact",
      languages: { ja: "/ja/contact", en: "/en/contact" },
    });
    expect(meta.openGraph).toMatchObject({
      locale: "en_US",
      url: `${siteUrl}/en/contact`,
    });
    const jaMeta = await generateMetadata(localeParams("ja"));
    expect(jaMeta.openGraph).toMatchObject({ locale: "ja_JP" });
  });

  it("returns nothing for an unknown locale", async () => {
    expect(await generateMetadata(localeParams("fr"))).toEqual({});
  });
});
