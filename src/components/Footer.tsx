import { Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, Noto Serif KR, serif' }}>
              AI<span className="gradient-text">마케팅</span> 강의
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#about" className="hover:text-gray-700 transition-colors">강사 소개</a>
            <a href="#curriculum" className="hover:text-gray-700 transition-colors">커리큘럼</a>
            <a href="#tools" className="hover:text-gray-700 transition-colors">AI 툴</a>
            <a href="#faq" className="hover:text-gray-700 transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-gray-700 transition-colors">문의</a>
          </nav>

          {/* Copy */}
          <p className="text-gray-400 text-sm">
            © 2026 AI마케팅 강의. All rights reserved.
          </p>
        </div>

        {/* Bottom tagline */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-xs">
            생성형 AI + 디지털 마케팅 + 바이브코딩 교육 전문
          </p>
        </div>
      </div>
    </footer>
  )
}
