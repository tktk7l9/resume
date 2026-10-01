import { BackToTopLink } from "@/components/back-to-top-link";
import { profile } from "@/data/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type FooterProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Footer({ locale, dict }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const copyright = dict.footer.copyright
    .replace("{year}", String(currentYear))
    .replace("{name}", profile.fullName[locale]);

  return (
    <footer className="border-t border-border py-4 bg-card mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-muted-foreground">{copyright}</div>
        {/* The page is 12,000px tall on a phone and the TOC sits at the
            top: give the reader a way back without scrolling (SHIG 60, 82). */}
        <BackToTopLink label={dict.footer.backToTop} />
      </div>
    </footer>
  );
}
