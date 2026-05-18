import { ExternalLink } from "@/components/external-link";
import type { Project } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import { ArrowUpRightIcon } from "lucide-react";

type ProjectsSectionProps = {
  locale: Locale;
  projects: Project[];
};

export function ProjectsSection({ locale, projects }: ProjectsSectionProps) {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div
          key={project.title[locale]}
          className="border border-border rounded-lg p-5 bg-card"
        >
          <h3 className="text-lg font-medium mb-2">
            <ExternalLink
              href={project.url}
              className="inline-flex items-center gap-1 text-foreground underline-offset-4 hover:underline"
            >
              {project.title[locale]}
              <ArrowUpRightIcon
                className="w-4 h-4 text-muted-foreground"
                aria-hidden="true"
              />
            </ExternalLink>
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            {project.summary[locale]}
          </p>

          {project.highlights[locale].length > 0 && (
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-outside ml-5 mb-4">
              {project.highlights[locale].map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          )}

          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
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
      ))}
    </div>
  );
}
