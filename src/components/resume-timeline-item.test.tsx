import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResumeTimelineItem } from "@/components/resume-timeline-item";
import type { ExperienceItem } from "@/data/experience";
import en from "@/i18n/dictionaries/en";
import ja from "@/i18n/dictionaries/ja";

const base: ExperienceItem = {
  startDate: "2021-07",
  endDate: "2024-08",
  type: "work",
  title: { ja: "フロントエンドエンジニア", en: "Frontend Engineer" },
  company: {
    name: { ja: "株式会社サンプル", en: "Sample Inc." },
    url: "https://example.com/",
  },
  responsibilities: {
    ja: ["設計と実装", "レビュー"],
    en: ["Design and build", "Reviews"],
  },
  achievements: { ja: ["LCP を 1.2 秒に短縮"], en: ["Cut LCP to 1.2s"] },
  tags: ["Next.js", "TypeScript"],
};

describe("ResumeTimelineItem", () => {
  it("renders the title, period, company link, lists and tags", () => {
    render(<ResumeTimelineItem locale="ja" dict={ja} item={base} />);
    expect(
      screen.getByRole("heading", { level: 3, name: base.title.ja }),
    ).toBeVisible();
    expect(screen.getByText(/2021年7月 - 2024年8月/)).toBeVisible();
    expect(screen.getByText("（3年2ヶ月）")).toBeVisible();
    const company = screen.getByRole("link", { name: base.company.name.ja });
    expect(company).toHaveAttribute("href", base.company.url);
    expect(company).toHaveAttribute("target", "_blank");

    expect(screen.getByText(ja.timeline.responsibilities)).toBeVisible();
    expect(screen.getByText(ja.timeline.achievements)).toBeVisible();
    const lists = screen.getAllByRole("list");
    expect(
      within(lists[0] as HTMLElement).getAllByRole("listitem"),
    ).toHaveLength(2);
    expect(screen.getByText("LCP を 1.2 秒に短縮")).toBeVisible();
    expect(screen.getByText("Next.js")).toBeVisible();
    expect(screen.getByText("TypeScript")).toBeVisible();
  });

  it("names the entry type for screen readers instead of relying on colour", () => {
    const { rerender } = render(
      <ResumeTimelineItem locale="ja" dict={ja} item={base} />,
    );
    expect(screen.getByText(ja.timeline.types.work)).toBeInTheDocument();

    rerender(
      <ResumeTimelineItem
        locale="ja"
        dict={ja}
        item={{ ...base, type: "education" }}
      />,
    );
    expect(screen.getByText(ja.timeline.types.education)).toBeInTheDocument();

    rerender(
      <ResumeTimelineItem
        locale="en"
        dict={en}
        item={{ ...base, type: "project" }}
      />,
    );
    expect(screen.getByText(en.timeline.types.project)).toBeInTheDocument();
  });

  it("shows the company as plain text when it has no URL", () => {
    render(
      <ResumeTimelineItem
        locale="en"
        dict={en}
        item={{ ...base, company: { name: base.company.name } }}
      />,
    );
    expect(screen.getByText("Sample Inc.")).toBeVisible();
    expect(screen.queryByRole("link", { name: "Sample Inc." })).toBeNull();
  });

  it("omits empty sections rather than showing bare headings", () => {
    render(
      <ResumeTimelineItem
        locale="en"
        dict={en}
        item={{
          ...base,
          responsibilities: { ja: [], en: [] },
          achievements: undefined,
          tags: [],
        }}
      />,
    );
    expect(screen.queryByText(en.timeline.responsibilities)).toBeNull();
    expect(screen.queryByText(en.timeline.achievements)).toBeNull();
    expect(screen.queryByRole("list")).toBeNull();
  });

  it("labels an ongoing role with the present marker", () => {
    render(
      <ResumeTimelineItem
        locale="en"
        dict={en}
        item={{ ...base, endDate: undefined }}
      />,
    );
    expect(
      screen.getByText(new RegExp(`Jul 2021 - ${en.timeline.present}`)),
    ).toBeVisible();
  });
});
