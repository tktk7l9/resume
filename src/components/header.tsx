import { ExternalLink } from "@/components/external-link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { profile } from "@/data/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  GithubIcon,
  LayoutGridIcon,
  LinkedinIcon,
  MailIcon,
} from "lucide-react";
import Link from "next/link";

type HeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Header({ locale, dict }: HeaderProps) {
  const fullName = profile.fullName[locale];

  return (
    <header className="border-b border-border sticky top-0 z-50 bg-card">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            {fullName}
          </h1>
          <p className="text-muted-foreground text-sm">{dict.meta.headline}</p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/${locale}/contact`}
            aria-label={dict.contact.pageTitle}
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors p-1"
          >
            <MailIcon className="w-4 h-4" />
          </Link>

          <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground mx-2">
            <span aria-hidden="true">•</span>
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
            <ExternalLink
              href={profile.portfolioUrl}
              className="text-muted-foreground hover:text-foreground transition-colors"
              ariaLabel={
                locale === "ja" ? "個人開発ポータル" : "Personal apps portal"
              }
            >
              <LayoutGridIcon className="w-4 h-4" />
            </ExternalLink>
          </div>

          <LanguageSwitcher
            locale={locale}
            label={dict.header.switchLanguage}
            ariaLabel={dict.header.switchLanguageAria}
          />
        </div>
      </div>
    </header>
  );
}
