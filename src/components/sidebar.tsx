import { ExternalLink } from "@/components/external-link";
import { SidebarNav, type SidebarNavItem } from "@/components/sidebar-nav";
import { profile } from "@/data/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  GithubIcon,
  LayoutGridIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  SendIcon,
} from "lucide-react";
import Link from "next/link";

type SidebarProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Sidebar({ locale, dict }: SidebarProps) {
  const navItems: SidebarNavItem[] = [
    { id: "about", label: dict.nav.about },
    { id: "timeline", label: dict.nav.timeline },
    { id: "projects", label: dict.nav.projects },
    { id: "skills", label: dict.nav.skills },
  ];

  const portfolioAria =
    locale === "ja" ? "個人開発ポータル" : "Personal apps portal";
  const address = profile.address[locale];
  const contactFormLabel =
    locale === "ja" ? "お問い合わせフォーム" : "Contact form";
  const contactHref = `/${locale}/contact`;

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="mb-6 md:sticky md:top-28">
        <nav>
          <div className="border border-border rounded-lg overflow-hidden bg-card mb-6">
            <p className="text-sm font-medium px-4 py-2 border-b border-border text-foreground">
              {locale === "ja" ? "目次" : "Contents"}
            </p>
            <SidebarNav items={navItems} basePath={`/${locale}`} />
          </div>

          <div className="space-y-4 hidden md:block">
            <div className="border border-border rounded-lg overflow-hidden bg-card">
              <p className="text-sm font-medium px-4 py-2 border-b border-border text-foreground">
                {dict.nav.contact}
              </p>
              <div className="p-4 text-sm text-muted-foreground space-y-2">
                <div className="flex items-center gap-2">
                  <MailIcon className="w-4 h-4 text-muted-foreground" />
                  <a
                    href={`mailto:${profile.email}`}
                    className="hover:text-foreground transition-colors break-all"
                  >
                    {profile.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4 text-muted-foreground" />
                  <span>{address}</span>
                </div>
                <Link
                  href={contactHref}
                  className="flex items-center gap-2 pt-1 text-foreground hover:opacity-80 transition-opacity"
                >
                  <SendIcon className="w-4 h-4" />
                  <span className="underline underline-offset-4">
                    {contactFormLabel}
                  </span>
                </Link>
              </div>
            </div>

            <div className="border border-border rounded-lg overflow-hidden bg-card">
              <p className="text-sm font-medium px-4 py-2 border-b border-border text-foreground">
                {dict.nav.links}
              </p>
              <div className="p-4 flex gap-4">
                <ExternalLink
                  href={profile.githubUrl}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  ariaLabel="GitHub"
                >
                  <GithubIcon className="w-5 h-5" />
                </ExternalLink>
                <ExternalLink
                  href={profile.linkedinUrl}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  ariaLabel="LinkedIn"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </ExternalLink>
                <ExternalLink
                  href={profile.portfolioUrl}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  ariaLabel={portfolioAria}
                >
                  <LayoutGridIcon className="w-5 h-5" />
                </ExternalLink>
              </div>
            </div>
          </div>

          <div className="mt-6 md:hidden">
            <div className="border border-border rounded-lg p-3 bg-card">
              <div className="flex flex-col gap-1">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground py-1.5"
                >
                  <MailIcon className="w-3 h-3" />
                  <span className="break-all">{profile.email}</span>
                </a>
                <span className="flex items-center gap-1 text-xs text-muted-foreground py-1.5">
                  <MapPinIcon className="w-3 h-3" />
                  <span>{address}</span>
                </span>
                <Link
                  href={contactHref}
                  className="flex items-center gap-1 text-xs text-foreground hover:opacity-80 py-1.5"
                >
                  <SendIcon className="w-3 h-3" />
                  <span className="underline underline-offset-4">
                    {contactFormLabel}
                  </span>
                </Link>
                <div className="flex gap-2 pt-1">
                  <ExternalLink
                    href={profile.githubUrl}
                    className="text-muted-foreground hover:text-foreground p-1.5"
                    ariaLabel="GitHub"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </ExternalLink>
                  <ExternalLink
                    href={profile.linkedinUrl}
                    className="text-muted-foreground hover:text-foreground p-1.5"
                    ariaLabel="LinkedIn"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </ExternalLink>
                  <ExternalLink
                    href={profile.portfolioUrl}
                    className="text-muted-foreground hover:text-foreground p-1.5"
                    ariaLabel={portfolioAria}
                  >
                    <LayoutGridIcon className="w-5 h-5" />
                  </ExternalLink>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
