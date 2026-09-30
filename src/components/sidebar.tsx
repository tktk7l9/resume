import { LayoutGridIcon, MailIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { ExternalLink } from "@/components/external-link";
import { SidebarNav, type SidebarNavItem } from "@/components/sidebar-nav";
import { profile } from "@/data/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type SidebarProps = {
  locale: Locale;
  dict: Dictionary;
};

// 44px ≈ 7mm: the smallest comfortable touch target (SHIG 78).
const iconLinkClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors";

export function Sidebar({ locale, dict }: SidebarProps) {
  const navItems: SidebarNavItem[] = [
    { id: "about", label: dict.nav.about },
    { id: "timeline", label: dict.nav.timeline },
    { id: "projects", label: dict.nav.projects },
    { id: "skills", label: dict.nav.skills },
  ];

  const portfolioAria = dict.nav.portfolio;
  const newTabHint = dict.nav.opensInNewTab;
  const address = profile.address[locale];
  const contactLabel = dict.contact.pageTitle;
  const contactHref = `/${locale}/contact`;

  const socialLinks = (
    <>
      <ExternalLink
        href={profile.githubUrl}
        className={iconLinkClass}
        ariaLabel="GitHub"
        newTabHint={newTabHint}
      >
        <GithubIcon className="w-5 h-5" />
      </ExternalLink>
      <ExternalLink
        href={profile.linkedinUrl}
        className={iconLinkClass}
        ariaLabel="LinkedIn"
        newTabHint={newTabHint}
      >
        <LinkedinIcon className="w-5 h-5" />
      </ExternalLink>
      <ExternalLink
        href={profile.portfolioUrl}
        className={iconLinkClass}
        ariaLabel={portfolioAria}
        newTabHint={newTabHint}
      >
        <LayoutGridIcon className="w-5 h-5" />
      </ExternalLink>
    </>
  );

  return (
    <aside className="w-full md:w-64 shrink-0 print:hidden">
      <div className="mb-6 md:sticky md:top-28">
        <nav aria-label={dict.nav.toc}>
          <div className="border border-border rounded-lg overflow-hidden bg-card mb-6">
            <p className="text-sm font-medium px-4 py-2 border-b border-border text-foreground">
              {dict.nav.toc}
            </p>
            <SidebarNav items={navItems} basePath={`/${locale}`} />
          </div>

          <div className="space-y-4 hidden md:block">
            <div className="border border-border rounded-lg overflow-hidden bg-card">
              <p className="text-sm font-medium px-4 py-2 border-b border-border text-foreground">
                {dict.nav.contact}
              </p>
              <div className="p-4 text-sm text-muted-foreground space-y-1">
                <div className="flex items-center gap-2 py-1">
                  <MapPinIcon className="w-4 h-4 text-muted-foreground" />
                  <span>{address}</span>
                </div>
                <Link
                  href={contactHref}
                  className="flex min-h-11 items-center gap-2 text-foreground hover:opacity-80 transition-opacity"
                >
                  <MailIcon className="w-4 h-4" />
                  <span className="underline underline-offset-4">
                    {contactLabel}
                  </span>
                </Link>
              </div>
            </div>

            <div className="border border-border rounded-lg overflow-hidden bg-card">
              <p className="text-sm font-medium px-4 py-2 border-b border-border text-foreground">
                {dict.nav.links}
              </p>
              <div className="px-2 py-1 flex gap-0.5">{socialLinks}</div>
            </div>
          </div>

          <div className="mt-6 md:hidden">
            <div className="border border-border rounded-lg p-3 bg-card">
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground py-1.5">
                  <MapPinIcon className="w-4 h-4" />
                  <span>{address}</span>
                </span>
                <Link
                  href={contactHref}
                  className="flex min-h-11 items-center gap-1.5 text-sm text-foreground hover:opacity-80"
                >
                  <MailIcon className="w-4 h-4" />
                  <span className="underline underline-offset-4">
                    {contactLabel}
                  </span>
                </Link>
                <div className="flex gap-0.5 -ml-2">{socialLinks}</div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
