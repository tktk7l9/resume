import { ExternalLink } from "@/components/external-link";
import { ResumeSection } from "@/components/resume-section";
import { ResumeSkillCard } from "@/components/resume-skill-card";
import { ResumeTimeline } from "@/components/resume-timeline";
import { ResumeTimelineItem } from "@/components/resume-timeline-item";
import { ClockIcon, CodeIcon, GlobeIcon } from "lucide-react";

export default function RootPage() {
  return (
    <>
      <ResumeSection
        title="経歴"
        id="timeline"
        icon={<ClockIcon className="w-5 h-5" />}
      >
        <ResumeTimeline>
          <ResumeTimelineItem
            date="2025年3月 - 現在"
            title="自動車サービス開発 - フロントエンドエンジニア（業務委託）"
            company={
              <ExternalLink href="https://www.softbanktech.co.jp/">
                SBテクノロジー株式会社
              </ExternalLink>
            }
            description="Next.js、React、TypeScriptを使用したWebアプリケーションの開発。"
            type="project"
          />
          <ResumeTimelineItem
            date="2024年9月 - 2025年2月"
            title="HRテック系新規サービス開発 - フロントエンドエンジニア（業務委託）"
            company={
              <ExternalLink href="https://leverages.jp/">
                レバレジーズ株式会社
              </ExternalLink>
            }
            description="React、TypeScriptを使用したモチベーション管理画面の開発。GraphQLでバックエンドと繋ぎ込みやステート管理の実装とUIコンポーネントやテストを作成。"
            type="project"
          />
          <ResumeTimelineItem
            date="2024年9月 - 現在"
            title="採用サイト開発・運用 - フロントエンドエンジニア（業務委託）"
            company={
              <ExternalLink href="https://caps365.jp/">
                CAPS株式会社
              </ExternalLink>
            }
            description="Next.js、React、TypeScriptを使用したWebサイトの開発・運用。リッチなUIデザイン実装やヘッドレスCMS連携、フォーム機能を含んだ採用サイトを開発。"
            type="project"
          />
          <ResumeTimelineItem
            date="2023年10月 - 2024年8月"
            title="管理画面リニューアル開発 - フロントエンドエンジニア"
            company={
              <ExternalLink href="https://caps365.jp/">
                CAPS株式会社
              </ExternalLink>
            }
            description="Next.js、React、TypeScriptを使用した患者やカルテ情報を管理する画面の開発。GraphQLでバックエンドと繋ぎ込みやステート管理の実装とUIコンポーネントやテストを作成。"
            type="work"
          />
          <ResumeTimelineItem
            date="2018年7月 - 2019年10月"
            title="クレジットカードの共通基幹システムの運用保守 - システムエンジニア"
            company={
              <ExternalLink href="https://www.ibm.com/jp-ja/about/subsidiaries/ijds">
                日本アイビーエム・ソリューション・サービス株式会社（ISOL）
              </ExternalLink>
            }
            description={
              "Excel資料作成、VBA自動化ツール作成、テスト、管理画面機能（Java）追加を担当。\nプロジェクト内で有志で集まる勉強会に参加、発表。\nOracle Certified Java Programmer, Silver SE 8の資格を取得。"
            }
            type="work"
          />
          <ResumeTimelineItem
            date="2018年4月 - 2018年7月"
            title="新入社員研修"
            company={
              <ExternalLink href="https://www.ibm.com/jp-ja/about/subsidiaries/ijds">
                日本アイビーエム・ソリューション・サービス株式会社（ISOL）
              </ExternalLink>
            }
            description={
              "新入社員研修を受け、ビジネスマナー、プログラミング（Java）、IBM製品を学習。\nまたチーム・個人開発、デザインシンキングのワークショップを実施。"
            }
            type="work"
          />
          <ResumeTimelineItem
            date="2012年4月 - 2018年3月"
            title="現代心理学部映像身体学科"
            company={
              <ExternalLink href="https://www.rikkyo.ac.jp/">
                立教大学
              </ExternalLink>
            }
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
            <h3 className="text-lg font-medium mb-2 text-[#4a4a4a]">日本語</h3>
            <p className="text-[#6b6b6b]">ネイティブ</p>
          </div>
          <div className="border border-[#e6e4df] rounded-lg p-4 bg-[#f5f4f0]">
            <h3 className="text-lg font-medium mb-2 text-[#4a4a4a]">英語</h3>
            <p className="text-[#6b6b6b]">ビジネスレベル（TOEIC 745点）</p>
          </div>
        </div>
      </ResumeSection>
    </>
  );
}
