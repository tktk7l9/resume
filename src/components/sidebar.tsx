import { ExternalLink } from "@/components/external-link";
import {
  ADDRESS,
  EMAIL,
  GITHUb_URL,
  LINKEDIN_URL,
  PHONE_NUMBER,
} from "@/const";
import {
  ClockIcon,
  CodeIcon,
  GithubIcon,
  LanguagesIcon as LanguageIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react";

const navItems = [
  { id: "timeline", label: "経歴", icon: <ClockIcon className="w-4 h-4" /> },
  { id: "skills", label: "スキル", icon: <CodeIcon className="w-4 h-4" /> },
  { id: "languages", label: "言語", icon: <LanguageIcon className="w-4 h-4" /> },
];

export function Sidebar() {
  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="mb-6">
        <nav>
          <div className="border border-[#e6e4df] rounded-lg overflow-hidden bg-[#f5f4f0] mb-6">
            <p className="text-sm font-medium px-4 py-2 border-b border-[#e6e4df] text-[#4a4a4a]">
              目次
            </p>
            <ul className="py-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors text-[#6b6b6b] hover:bg-[#f0efe9] hover:text-[#4a4a4a]"
                  >
                    {item.icon}
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* デスクトップ表示 */}
          <div className="space-y-4 hidden md:block">
            <div className="border border-[#e6e4df] rounded-lg overflow-hidden bg-[#f5f4f0]">
              <p className="text-sm font-medium px-4 py-2 border-b border-[#e6e4df] text-[#4a4a4a]">
                連絡先
              </p>
              <div className="p-4 text-sm text-[#6b6b6b] space-y-2">
                <div className="flex items-center gap-2">
                  <MailIcon className="w-4 h-4 text-[#6b6b6b]" />
                  <span>{EMAIL}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 text-[#6b6b6b]" />
                  <span>{PHONE_NUMBER}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4 text-[#6b6b6b]" />
                  <span>{ADDRESS}</span>
                </div>
              </div>
            </div>

            <div className="border border-[#e6e4df] rounded-lg overflow-hidden bg-[#f5f4f0]">
              <p className="text-sm font-medium px-4 py-2 border-b border-[#e6e4df] text-[#4a4a4a]">
                リンク
              </p>
              <div className="p-4 flex gap-4">
                <ExternalLink
                  href={GITHUb_URL}
                  className="text-[#6b6b6b] hover:text-[#4a4a4a] transition-colors"
                  ariaLabel="GitHub"
                >
                  <GithubIcon className="w-5 h-5" />
                </ExternalLink>
                <ExternalLink
                  href={LINKEDIN_URL}
                  className="text-[#6b6b6b] hover:text-[#4a4a4a] transition-colors"
                  ariaLabel="LinkedIn"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </ExternalLink>
              </div>
            </div>
          </div>

          {/* モバイル表示 */}
          <div className="mt-6 md:hidden">
            <div className="border border-[#e6e4df] rounded-lg p-3 bg-[#f5f4f0]">
              <div className="flex flex-col flex-wrap gap-1 justify-center">
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-1 text-xs text-[#6b6b6b] hover:text-[#4a4a4a] py-1.5"
                >
                  <MailIcon className="w-3 h-3" />
                  <span>{EMAIL}</span>
                </a>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex items-center gap-1 text-xs text-[#6b6b6b] hover:text-[#4a4a4a] py-1.5"
                >
                  <PhoneIcon className="w-3 h-3" />
                  <span>{PHONE_NUMBER}</span>
                </a>
                <span className="flex items-center gap-1 text-xs text-[#6b6b6b]">
                  <MapPinIcon className="w-3 h-3" />
                  <span>{ADDRESS}</span>
                </span>
                <div className="flex flex-wrap gap-1">
                  <ExternalLink
                    href={GITHUb_URL}
                    className="flex items-center gap-1 text-xs text-[#6b6b6b] hover:text-[#4a4a4a] p-1.5"
                    ariaLabel="GitHub"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </ExternalLink>
                  <ExternalLink
                    href={LINKEDIN_URL}
                    className="flex items-center gap-1 text-xs text-[#6b6b6b] hover:text-[#4a4a4a] p-1.5"
                    ariaLabel="LinkedIn"
                  >
                    <LinkedinIcon className="w-5 h-5" />
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
