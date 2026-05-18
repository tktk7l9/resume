import { ExternalLink } from "@/components/external-link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { PrintButton } from "@/components/print-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/data/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { GithubIcon, LinkedinIcon } from "lucide-react";

type HeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Header({ locale, dict }: HeaderProps) {
  const fullName = profile.fullName[locale];
  const initials = locale === "ja" ? "齋" : "TS";

  return (
    <header
      data-print="hide"
      className="border-b border-border sticky top-0 z-50 bg-card/95 backdrop-blur"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-4">
          <div
            aria-hidden="true"
            className="flex items-center justify-center w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] rounded-full bg-muted text-foreground font-bold text-2xl shrink-0"
          >
            {initials}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              {fullName}
            </h1>
            <p className="text-muted-foreground text-sm">
              {dict.meta.headline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground mr-2">
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-foreground transition-colors"
            >
              {profile.email}
            </a>
            <span>•</span>
            <ExternalLink
              href={profile.githubUrl}
              className="text-muted-foreground hover:text-foreground transition-colors"
              ariaLabel="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </ExternalLink>
            <ExternalLink
              href={profile.linkedinUrl}
              className="text-muted-foreground hover:text-foreground transition-colors"
              ariaLabel="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </ExternalLink>
          </div>

          <PrintButton label={dict.header.downloadPdf} />
          <LanguageSwitcher
            locale={locale}
            label={dict.header.switchLanguage}
            ariaLabel={dict.header.switchLanguageAria}
          />
          <ThemeToggle label={dict.header.toggleTheme} />
        </div>
      </div>
    </header>
  );
}
