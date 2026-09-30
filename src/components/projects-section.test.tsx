import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectsSection } from "@/components/projects-section";
import type { Project } from "@/data/projects";

const projects: Project[] = [
  {
    title: { ja: "サムウェア・ナウ", en: "Somewhere Now" },
    url: "https://example.com/somewhere",
    summary: { ja: "世界のライブカメラ", en: "Live cameras worldwide" },
    highlights: { ja: ["5,720 地点"], en: ["5,720 spots"] },
    tags: ["Workers", "KV"],
  },
  {
    title: { ja: "ミニマル", en: "Minimal" },
    url: "https://example.com/minimal",
    summary: { ja: "説明のみ", en: "Summary only" },
    highlights: { ja: [], en: [] },
    tags: [],
  },
];

describe("ProjectsSection", () => {
  it("links each project title to its site in a new tab", () => {
    render(<ProjectsSection locale="ja" projects={projects} />);
    const link = screen.getByRole("link", { name: "サムウェア・ナウ" });
    expect(link).toHaveAttribute("href", "https://example.com/somewhere");
    expect(link).toHaveAttribute("target", "_blank");
    expect(screen.getByText("世界のライブカメラ")).toBeVisible();
  });

  it("shows highlights and tags only when there are any", () => {
    render(<ProjectsSection locale="en" projects={projects} />);
    const lists = screen.getAllByRole("list");
    expect(lists).toHaveLength(1);
    expect(
      within(lists[0] as HTMLElement).getByText("5,720 spots"),
    ).toBeVisible();
    expect(screen.getByText("Workers")).toBeVisible();
    expect(screen.getByText("Summary only")).toBeVisible();
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2);
  });
});
