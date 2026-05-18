import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { ResumeSection } from "@/components/resume-section";
import { ResumeSkillCard } from "@/components/resume-skill-card";
import { ResumeTimeline } from "@/components/resume-timeline";
import { ResumeTimelineItem } from "@/components/resume-timeline-item";
import { about } from "@/data/about";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { type Locale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ClockIcon, CodeIcon, RocketIcon, UserIcon } from "lucide-react";
import { notFound } from "next/navigation";

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
        <ProjectsSection locale={locale} projects={projects} />
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
    </>
  );
}
