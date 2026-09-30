import {
  ArrowRightIcon,
  ClockIcon,
  CodeIcon,
  RocketIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { ResumeSection } from "@/components/resume-section";
import { ResumeSkillCard } from "@/components/resume-skill-card";
import { ResumeTimeline } from "@/components/resume-timeline";
import { ResumeTimelineItem } from "@/components/resume-timeline-item";
import { getAbout } from "@/data/about";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function ResumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) {
    notFound();
  }
  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);
  const about = getAbout();

  return (
    <>
      <ResumeSection
        title={dict.sections.about}
        id="about"
        icon={<UserIcon className="w-5 h-5" />}
      >
        <AboutSection locale={locale} about={about} />
      </ResumeSection>

      <ResumeSection
        title={dict.sections.timeline}
        id="timeline"
        icon={<ClockIcon className="w-5 h-5" />}
      >
        <ResumeTimeline>
          {experience.map((item) => (
            <ResumeTimelineItem
              key={`${item.startDate}-${item.title[locale]}`}
              locale={locale}
              dict={dict}
              item={item}
            />
          ))}
        </ResumeTimeline>
      </ResumeSection>

      <ResumeSection
        title={dict.sections.projects}
        id="projects"
        icon={<RocketIcon className="w-5 h-5" />}
      >
        <ProjectsSection
          locale={locale}
          projects={projects}
          newTabHint={dict.nav.opensInNewTab}
        />
      </ResumeSection>

      <ResumeSection
        title={dict.sections.skills}
        id="skills"
        icon={<CodeIcon className="w-5 h-5" />}
      >
        <div className="grid grid-cols-1 gap-4">
          {skillCategories.map((category) => (
            <ResumeSkillCard
              key={category.title[locale]}
              title={category.title[locale]}
              skills={category.skills}
            />
          ))}
        </div>
      </ResumeSection>

      {/* The résumé ends here; the next step for a reader is to get in
          touch, so offer it where they are instead of 11,000px up in the
          sidebar (SHIG 20, 41, 60). */}
      <section
        aria-labelledby="closing-contact-title"
        className="mb-10 rounded-lg border border-border bg-card p-5 print:hidden"
      >
        <h2
          id="closing-contact-title"
          className="text-base font-medium text-foreground"
        >
          {dict.closing.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {dict.closing.description}
        </p>
        <Link
          href={`/${locale}/contact`}
          className="mt-3 inline-flex min-h-11 items-center gap-1 rounded-md bg-foreground px-5 py-2 text-sm font-medium text-background transition-colors hover:opacity-90"
        >
          {dict.closing.cta}
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
