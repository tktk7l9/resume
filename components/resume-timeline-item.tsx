import { BriefcaseIcon, GraduationCapIcon, CodeIcon } from "lucide-react"

interface ResumeTimelineItemProps {
  date: string
  title: string
  company: string
  description: string
  type: "work" | "education" | "project"
}

export function ResumeTimelineItem({ date, title, company, description, type }: ResumeTimelineItemProps) {
  const getIcon = () => {
    switch (type) {
      case "work":
        return <BriefcaseIcon className="h-5 w-5" />
      case "education":
        return <GraduationCapIcon className="h-5 w-5" />
      case "project":
        return <CodeIcon className="h-5 w-5" />
      default:
        return <BriefcaseIcon className="h-5 w-5" />
    }
  }

  const getTypeColor = () => {
    switch (type) {
      case "work":
        return "bg-[#7eb0d5]"
      case "education":
        return "bg-[#a8d5ba]"
      case "project":
        return "bg-[#d5a8c6]"
      default:
        return "bg-[#d5d0a8]"
    }
  }

  return (
    <div className="relative flex items-start">
      {/* タイムラインのドット */}
      <div className="absolute left-4 w-8 h-8 rounded-full bg-[#f5f4f0] border-4 border-[#e6e4df] flex items-center justify-center transform -translate-x-1/2 z-5">
        <span className={`w-4 h-4 rounded-full ${getTypeColor()}`}></span>
      </div>

      {/* コンテンツ */}
      <div className="ml-16">
        <div className="font-medium text-[#6b6b6b] mb-1">{date}</div>
        <div className="bg-[#f5f4f0] p-4 rounded-lg border border-[#e6e4df] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${getTypeColor()} text-white`}
            >
              {getIcon()}
            </span>
            <h3 className="text-lg font-medium text-[#4a4a4a]">{title}</h3>
          </div>
          <div className="text-[#6b6b6b] mb-2">{company}</div>
          <p className="text-sm text-[#6b6b6b]">{description}</p>
        </div>
      </div>
    </div>
  )
}

