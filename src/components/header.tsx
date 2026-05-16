import { ExternalLink } from "@/components/external-link";
import {
  EMAIL,
  FULL_NAME,
  GITHUb_URL,
  LINKEDIN_URL,
  PHONE_NUMBER,
} from "@/const";
import { GithubIcon, LinkedinIcon } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-[#e6e4df] sticky top-0 z-50 bg-[#f5f4f0]">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgMTIwIj48Y2lyY2xlIGN4PSI2MCIgY3k9IjYwIiByPSI2MCIgZmlsbD0iI2U2ZTRkZiIvPjx0ZXh0IHg9IjYwIiB5PSI3MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmIiBmb250LXNpemU9IjM2IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzRhNGE0YSI+U1Q8L3RleHQ+PC9zdmc+"
            alt="齋藤 拓也"
            width={120}
            height={120}
            className="w-[120px] h-[120px] rounded-full shrink-0"
          />
          <div>
            <h1 className="text-2xl font-bold text-[#4a4a4a]">{FULL_NAME}</h1>
            <p className="text-[#6b6b6b]">フロントエンドエンジニア（業務委託）</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm text-[#6b6b6b]">
            <a href={`mailto:${EMAIL}`} className="hover:text-[#4a4a4a]">
              {EMAIL}
            </a>
            <span>•</span>
            <a href={`tel:${PHONE_NUMBER}`} className="hover:text-[#4a4a4a]">
              {PHONE_NUMBER}
            </a>
            <span>•</span>
            <div className="flex gap-2">
              <ExternalLink
                href={GITHUb_URL}
                className="text-[#6b6b6b] hover:text-[#4a4a4a] transition-colors"
                ariaLabel="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </ExternalLink>
              <ExternalLink
                href={LINKEDIN_URL}
                className="text-[#6b6b6b] hover:text-[#4a4a4a] transition-colors"
                ariaLabel="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </ExternalLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
