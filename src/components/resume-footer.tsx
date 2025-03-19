export function ResumeFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[#e6e4df] py-4 bg-[#f5f4f0]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-sm text-center text-[#6b6b6b]">© {currentYear} 齋藤 拓也</div>
      </div>
    </footer>
  )
}

