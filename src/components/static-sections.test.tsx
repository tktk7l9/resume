import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AboutSection } from "@/components/about-section";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { ExternalLink } from "@/components/external-link";
import { ResumeSection } from "@/components/resume-section";
import { ResumeSkillCard } from "@/components/resume-skill-card";
import { ResumeTimeline } from "@/components/resume-timeline";
import type { About } from "@/data/about";

const about: About = {
  headline: { ja: "見出し", en: "Headline" },
  summary: { ja: "一行目\n二行目", en: "Line one\nLine two" },
  strengths: [
    {
      title: { ja: "強み A", en: "Strength A" },
      body: { ja: "本文 A", en: "Body A" },
    },
    {
      title: { ja: "強み B", en: "Strength B" },
      body: { ja: "本文 B", en: "Body B" },
    },
  ],
};

describe("AboutSection", () => {
  it("shows the headline, summary and one card per strength", () => {
    render(<AboutSection locale="ja" about={about} />);
    expect(screen.getByText("見出し")).toBeVisible();
    expect(screen.getByText(/一行目/)).toHaveTextContent("一行目 二行目");
    const strengths = screen.getAllByRole("heading", { level: 3 });
    expect(strengths.map((h) => h.textContent)).toEqual(["強み A", "強み B"]);
    expect(screen.getByText("本文 B")).toBeVisible();
  });

  it("switches every string with the locale", () => {
    render(<AboutSection locale="en" about={about} />);
    expect(screen.getByText("Headline")).toBeVisible();
    expect(screen.getByText("Body A")).toBeVisible();
    expect(screen.queryByText("見出し")).toBeNull();
  });
});

describe("ResumeSection", () => {
  it("is an anchorable section headed by its title", () => {
    render(
      <ResumeSection title="経歴" id="timeline" icon={<span>icon</span>}>
        <p>中身</p>
      </ResumeSection>,
    );
    const section = document.getElementById("timeline");
    expect(section?.tagName).toBe("SECTION");
    expect(
      within(section as HTMLElement).getByRole("heading", { level: 2 }),
    ).toHaveTextContent("経歴");
    expect(within(section as HTMLElement).getByText("中身")).toBeVisible();
  });
});

describe("ResumeSkillCard", () => {
  it("lists each skill under the category title", () => {
    render(<ResumeSkillCard title="言語" skills={["TypeScript", "Go"]} />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("言語");
    expect(screen.getByText("TypeScript")).toBeVisible();
    expect(screen.getByText("Go")).toBeVisible();
  });
});

describe("ResumeTimeline", () => {
  it("renders its children", () => {
    render(
      <ResumeTimeline>
        <p>最初の項目</p>
      </ResumeTimeline>,
    );
    expect(screen.getByText("最初の項目")).toBeVisible();
  });
});

describe("ExternalLink", () => {
  it("opens in a new tab without leaking the opener", () => {
    render(
      <ExternalLink href="https://example.com/" ariaLabel="Example">
        text
      </ExternalLink>,
    );
    const link = screen.getByRole("link", { name: "Example" });
    expect(link).toHaveAttribute("href", "https://example.com/");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveTextContent("text");
  });
});

describe("brand icons", () => {
  it("carry an accessible title and forward props", () => {
    render(
      <>
        <GithubIcon data-testid="gh" className="w-4" />
        <LinkedinIcon data-testid="li" />
      </>,
    );
    expect(screen.getByTestId("gh")).toHaveClass("w-4");
    expect(screen.getByTitle("GitHub")).toBeInTheDocument();
    expect(screen.getByTitle("LinkedIn")).toBeInTheDocument();
  });
});
