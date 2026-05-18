import type { about as aboutData } from "@/data/about";
import type { Locale } from "@/i18n/config";

type AboutSectionProps = {
  locale: Locale;
  about: typeof aboutData;
};

export function AboutSection({ locale, about }: AboutSectionProps) {
  return (
    <div className="space-y-4">
      <div className="resume-card border border-border rounded-lg p-5 bg-card">
        <p className="text-base font-medium text-foreground mb-3 leading-relaxed">
          {about.headline[locale]}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {about.summary[locale]}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {about.strengths.map((strength) => (
          <div
            key={strength.title[locale]}
            className="resume-card border border-border rounded-lg p-4 bg-card"
          >
            <h3 className="text-base font-medium text-foreground mb-2">
              {strength.title[locale]}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {strength.body[locale]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
