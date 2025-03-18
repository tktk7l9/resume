import { ResumeHeader } from "./components/resume-header";
import { ResumeSidebar } from "./components/resume-sidebar";
import { ResumeSection } from "./components/resume-section";
import { ResumeTimeline } from "./components/resume-timeline";
import { ResumeTimelineItem } from "./components/resume-timeline-item";
import { ResumeSkillCard } from "./components/resume-skill-card";
import { ResumeFooter } from "./components/resume-footer";
import { ClockIcon, CodeIcon, GlobeIcon } from "lucide-react";

export default function Resume() {
  return (
    <div className="min-h-screen bg-[#f8f7f4] flex flex-col">
      <ResumeHeader />
      <div className="flex-1">
        <div className="flex flex-col md:flex-row max-w-6xl mx-auto px-4 py-8 gap-8">
          <aside className="w-full md:w-64 shrink-0">
            <ResumeSidebar />
          </aside>
          <main className="flex-1">
            <ResumeSection
              title="経歴"
              id="timeline"
              icon={<ClockIcon className="w-5 h-5" />}
            >
              <ResumeTimeline>
                <ResumeTimelineItem
                  date="2025年3月 - 現在"
                  title="フロントエンドエンジニア（業務委託）"
                  company="自動車サービス開発"
                  description="Next.js、React、TypeScriptを使用した大規模Webアプリケーションの開発。パフォーマンス最適化とアクセシビリティの向上に貢献。チームリーダーとして5人のエンジニアをマネジメント。"
                  type="work"
                />
                <ResumeTimelineItem
                  date="2024年9月 - 2025年2月"
                  title="フロントエンドエンジニア（業務委託）"
                  company="HRテック系新規サービス開発"
                  description="React、TypeScriptを使用したEコマースプラットフォームの開発。レスポンシブデザインの実装とUIコンポーネントライブラリの構築。"
                  type="work"
                />
                <ResumeTimelineItem
                  date="2024年4月 - 2024年8月"
                  title="フロントエンドエンジニア"
                  company="管理画面リニューアル開発"
                  description="Next.js、React、TypeScriptを使用したWebサイトの開発。レスポンシブデザインとクロスブラウザ互換性の確保。"
                  type="work"
                />
                <ResumeTimelineItem
                  date="2022年"
                  title="Eコマースプラットフォーム"
                  company="個人プロジェクト"
                  description="Next.js、TypeScript、Tailwind CSS、Prisma、PostgreSQLを使用したフルスタックEコマースプラットフォーム。ユーザー認証、商品管理、カート機能、決済処理を実装。"
                  type="project"
                />
                <ResumeTimelineItem
                  date="2021年"
                  title="タスク管理アプリ"
                  company="オープンソースプロジェクト"
                  description="React、Redux、Firebase、Material-UIを使用したタスク管理アプリ。リアルタイムデータ同期、ドラッグアンドドロップ機能、フィルタリング機能を実装。GitHub上で50以上のスター獲得。"
                  type="project"
                />
                <ResumeTimelineItem
                  date="2012年4月 - 2018年3月"
                  title="現代心理学部映像身体学科"
                  company="立教大学"
                  description="映画、写真、広告、演劇、ダンス、武術など、映像表現や身体表現をワークショップを通して、その手法や知識、仕事の進め方を学習。"
                  type="education"
                />
              </ResumeTimeline>
            </ResumeSection>

            <ResumeSection
              title="スキル"
              id="skills"
              icon={<CodeIcon className="w-5 h-5" />}
            >
              <div className="grid grid-cols-1 gap-4">
                <ResumeSkillCard
                  title="プログラミング言語"
                  skills={["TypeScript / JavaScript", "HTML / CSS"]}
                />
                <ResumeSkillCard
                  title="フレームワーク"
                  skills={["Next.js / React", "Tailwind CSS", "Mantine"]}
                />
                <ResumeSkillCard
                  title="ツール"
                  skills={[
                    "Git / GitHub / GitLab",
                    "Docker",
                    "Webpack / Vite",
                    "Figma",
                  ]}
                />
                <ResumeSkillCard
                  title="その他"
                  skills={["アジャイル / スクラム", "CI/CD"]}
                />
              </div>
            </ResumeSection>

            <ResumeSection
              title="言語"
              id="languages"
              icon={<GlobeIcon className="w-5 h-5" />}
            >
              <div className="grid grid-cols-1 gap-4">
                <div className="border border-[#e6e4df] rounded-lg p-4 bg-[#f5f4f0]">
                  <h3 className="text-lg font-medium mb-2 text-[#4a4a4a]">
                    日本語
                  </h3>
                  <p className="text-[#6b6b6b]">ネイティブ</p>
                </div>
                <div className="border border-[#e6e4df] rounded-lg p-4 bg-[#f5f4f0]">
                  <h3 className="text-lg font-medium mb-2 text-[#4a4a4a]">
                    英語
                  </h3>
                  <p className="text-[#6b6b6b]">
                    ビジネスレベル（TOEIC 745点）
                  </p>
                </div>
              </div>
            </ResumeSection>
          </main>
        </div>
      </div>
      <ResumeFooter />
    </div>
  );
}
