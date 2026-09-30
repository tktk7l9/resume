import { LayoutGridIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { ExternalLink } from "@/components/external-link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { profile } from "@/data/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type HeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

// 44px ≈ 7mm: the smallest comfortable touch target (SHIG 78).
const iconLinkClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-md hover:bg-accent hover:text-foreground transition-colors";

export function Header({ locale, dict }: HeaderProps) {
  const fullName = profile.fullName[locale];
  const newTabHint = dict.nav.opensInNewTab;

  return (
    // id/tabIndex: the footer's "back to top" link lands focus here.
    <header
      id="top"
      tabIndex={-1}
      className="border-b border-border bg-card md:sticky md:top-0 md:z-50 print:static focus:outline-none"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            <Link
              href={`/${locale}`}
              className="underline-offset-4 hover:underline"
            >
              {fullName}
            </Link>
          </h1>
          <p className="text-muted-foreground text-sm">{dict.meta.headline}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5 text-muted-foreground print:hidden">
            <Link
              href={`/${locale}/contact`}
              aria-label={dict.contact.pageTitle}
              className={iconLinkClass}
            >
              <MailIcon className="w-4 h-4" />
            </Link>
            <ExternalLink
              href={profile.githubUrl}
              className={iconLinkClass}
              ariaLabel="GitHub"
              newTabHint={newTabHint}
            >
              <GithubIcon className="w-4 h-4" />
            </ExternalLink>
            <ExternalLink
              href={profile.linkedinUrl}
              className={iconLinkClass}
              ariaLabel="LinkedIn"
              newTabHint={newTabHint}
            >
              <LinkedinIcon className="w-4 h-4" />
            </ExternalLink>
            <ExternalLink
              href={profile.portfolioUrl}
              className={iconLinkClass}
              ariaLabel={dict.nav.portfolio}
              newTabHint={newTabHint}
            >
              <LayoutGridIcon className="w-4 h-4" />
            </ExternalLink>
          </div>

          <div className="print:hidden">
            <LanguageSwitcher
              locale={locale}
              label={dict.header.switchLanguage}
              ariaLabel={dict.header.switchLanguageAria}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
