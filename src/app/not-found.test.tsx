import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound, * as notFoundModule from "@/app/not-found";
import en from "@/i18n/dictionaries/en";
import ja from "@/i18n/dictionaries/ja";
import { renderAsync } from "@/test/render-async";

describe("not-found page", () => {
  it("renders one block per language, each pointing back to its own résumé", async () => {
    await renderAsync(NotFound());

    const jaBlock = screen.getByRole("region", { name: ja.notFound.title });
    expect(jaBlock).toHaveAttribute("lang", "ja");
    expect(
      within(jaBlock).getByRole("link", { name: ja.notFound.backToResume }),
    ).toHaveAttribute("href", "/ja");
    expect(within(jaBlock).getByText(ja.notFound.description)).toBeVisible();

    const enBlock = screen.getByRole("region", { name: en.notFound.title });
    expect(enBlock).toHaveAttribute("lang", "en");
    expect(
      within(enBlock).getByRole("link", { name: en.notFound.backToResume }),
    ).toHaveAttribute("href", "/en");
  });

  it("keeps a single h1 (the default locale) and a main landmark", async () => {
    await renderAsync(NotFound());

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      ja.notFound.title,
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      en.notFound.title,
    );
    expect(screen.getByRole("main")).toHaveAttribute("id", "main");
  });

  it("renders its title inline instead of exporting metadata", async () => {
    // A `metadata` export is silently dropped on hydration for not-found.js,
    // leaving the document untitled (axe: document-title).
    expect(notFoundModule).not.toHaveProperty("metadata");
    expect(notFoundModule).not.toHaveProperty("generateMetadata");

    // React 19 hoists <title> into <head>, so the document gets a real title.
    await renderAsync(NotFound());
    expect(document.title).toMatch(/^404/);
    expect(document.title).toContain(ja.notFound.title);
  });
});
