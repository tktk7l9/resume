import type { LanguageItem } from "@/data/languages";
import type { Locale } from "@/i18n/config";

type LanguagesSectionProps = {
  locale: Locale;
  languages: LanguageItem[];
};

export function LanguagesSection({ locale, languages }: LanguagesSectionProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {languages.map((language) => (
        <div
          key={language.name[locale]}
          className="border border-border rounded-lg p-4 bg-card"
        >
          <h3 className="text-lg font-medium mb-2 text-foreground">
            {language.name[locale]}
          </h3>
          <p className="text-muted-foreground">{language.level[locale]}</p>
        </div>
      ))}
    </div>
  );
}
