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
    <footer
      data-print="hide"
      className="border-t border-border py-4 bg-card mt-auto"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-sm text-center text-muted-foreground">
          {copyright}
        </div>
      </div>
    </footer>
  );
}
