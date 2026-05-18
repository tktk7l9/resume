import { ExternalLink } from "@/components/external-link";
import type { ExperienceItem } from "@/data/experience";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { formatDate } from "@/lib/format-date";
import { BriefcaseIcon, CodeIcon, GraduationCapIcon } from "lucide-react";

interface ResumeTimelineItemProps {
  locale: Locale;
  dict: Dictionary;
  item: ExperienceItem;
}

export function ResumeTimelineItem({
  locale,
  dict,
  item,
}: ResumeTimelineItemProps) {
  const getIcon = () => {
    switch (item.type) {
      case "work":
        return <BriefcaseIcon className="h-5 w-5" />;
      case "education":
        return <GraduationCapIcon className="h-5 w-5" />;
      case "project":
        return <CodeIcon className="h-5 w-5" />;
      default:
        return <BriefcaseIcon className="h-5 w-5" />;
    }
  };

  const typeColorClass = (() => {
    switch (item.type) {
      case "work":
        return "bg-timeline-work";
      case "education":
        return "bg-timeline-education";
      case "project":
        return "bg-timeline-project";
      default:
        return "bg-timeline-work";
    }
  })();

  const { periodStartEndLabel, formattedPeriod } = formatDate(
    item.startDate,
    item.endDate,
    locale,
    dict,
  );

  const companyName = item.company.name[locale];
  const responsibilities = item.responsibilities[locale];
  const achievements = item.achievements?.[locale] ?? [];

  return (
    <div className="timeline-item relative flex items-start">
      <div className="absolute left-4 w-8 h-8 rounded-full bg-card border-4 border-border flex items-center justify-center transform -translate-x-1/2 z-5">
        <span
          className={`w-4 h-4 rounded-full ${typeColorClass} ${
            !item.endDate ? "animate-pulse" : ""
          }`}
        />
      </div>

      <div className="ml-16 w-full">
        <div className="font-medium text-muted-foreground mb-1">
          {periodStartEndLabel}
          <span className="text-muted-foreground font-normal ml-2 text-sm">
            （{formattedPeriod}）
          </span>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${typeColorClass} text-white`}
            >
              {getIcon()}
            </span>
            <h3 className="text-lg font-medium text-foreground">
              {item.title[locale]}
            </h3>
          </div>
          <div className="text-muted-foreground mb-3">
            {item.company.url ? (
              <ExternalLink
                href={item.company.url}
                className="underline-offset-2 hover:underline"
              >
                {companyName}
              </ExternalLink>
            ) : (
              companyName
            )}
          </div>

          {responsibilities.length > 0 && (
            <div className="mb-2">
              <div className="text-xs font-semibold text-foreground mb-1 uppercase tracking-wide">
                {dict.timeline.responsibilities}
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-outside ml-5">
                {responsibilities.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          )}

          {achievements.length > 0 && (
            <div className="mb-2">
              <div className="text-xs font-semibold text-foreground mb-1 uppercase tracking-wide">
                {dict.timeline.achievements}
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-outside ml-5">
                {achievements.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          )}

          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs bg-background text-muted-foreground border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
