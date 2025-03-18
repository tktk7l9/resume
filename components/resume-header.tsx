import { GithubIcon, LinkedinIcon, GlobeIcon } from "lucide-react"

export function ResumeHeader() {
  return (
    <header className="border-b border-[#e6e4df] sticky top-0 z-50 bg-[#f5f4f0]">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#4a4a4a]">齋藤 拓也</h1>
          <p className="text-[#6b6b6b]">フロントエンドエンジニア（業務委託）</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm text-[#6b6b6b]">
            <a href="mailto:saitotakuya0719@gmail.com" className="hover:text-[#4a4a4a]">
              saitotakuya0719@gmail.com
            </a>
            <span>•</span>
            <a href="tel:+81-90-5572-0816" className="hover:text-[#4a4a4a]">
              090-5572-0816
            </a>
            <span>•</span>
            <div className="flex gap-2">
              <a
                href="https://github.com/tktk7l9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6b6b6b] hover:text-[#4a4a4a] transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/tktk7l9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6b6b6b] hover:text-[#4a4a4a] transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://tktk7l9.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6b6b6b] hover:text-[#4a4a4a] transition-colors"
                aria-label="ポートフォリオ"
              >
                <GlobeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

