import { screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ResumePage from "@/app/[locale]/page";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import en from "@/i18n/dictionaries/en";
import ja from "@/i18n/dictionaries/ja";
import { localeParams, renderAsync } from "@/test/render-async";

const notFound = vi.fn(() => {
  throw new Error("NEXT_NOT_FOUND");
});
vi.mock("next/navigation", () => ({ notFound: () => notFound() }));

describe("résumé page", () => {
  it("renders the four anchored sections in navigation order", async () => {
    await renderAsync(ResumePage(localeParams("ja")));
    const headings = screen
      .getAllByRole("heading", { level: 2 })
      .map((h) => h.textContent);
    expect(headings).toEqual([
      ja.sections.about,
      ja.sections.timeline,
      ja.sections.projects,
      ja.sections.skills,
    ]);
    for (const id of ["about", "timeline", "projects", "skills"]) {
      expect(document.getElementById(id)?.tagName).toBe("SECTION");
    }
  });

  it("lists every experience entry, project and skill category", async () => {
    await renderAsync(ResumePage(localeParams("en")));
    const timeline = document.getElementById("timeline") as HTMLElement;
    const entryTitles = within(timeline)
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);
    expect(entryTitles).toEqual(experience.map((item) => item.title.en));

    const projectsSection = document.getElementById("projects") as HTMLElement;
    for (const project of projects) {
      expect(
        within(projectsSection).getByRole("link", { name: project.title.en }),
      ).toHaveAttribute("href", project.url);
    }

    const skills = document.getElementById("skills") as HTMLElement;
    const skillTitles = within(skills)
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);
    expect(skillTitles).toEqual(skillCategories.map((c) => c.title.en));
  });

  it("renders the experience in the page language", async () => {
    await renderAsync(ResumePage(localeParams("ja")));
    const first = experience[0] as (typeof experience)[number];
    // The same role appears twice (contract moved between group companies).
    expect(screen.getAllByText(first.title.ja).length).toBeGreaterThan(0);
    expect(screen.queryByText(first.title.en)).toBeNull();
    expect(screen.queryByText(en.sections.about)).toBeNull();
  });

  it("404s for an unknown locale", async () => {
    await expect(ResumePage(localeParams("fr"))).rejects.toThrow(
      "NEXT_NOT_FOUND",
    );
    expect(notFound).toHaveBeenCalled();
  });
});
