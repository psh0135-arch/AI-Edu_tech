import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Sparkles, Users, Clock } from 'lucide-react'

const stats = [
  { icon: Clock, value: '100H+', label: '강의 시간' },
  { icon: BookOpen, value: '25회', label: '세션 수업' },
  { icon: Users, value: '500+', label: '수강생' },
  { icon: Sparkles, value: '7단계', label: 'AI 커리큘럼' },
]

interface HeroProps {
  onApply: () => void
}

export default function Hero({ onApply }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern pt-16">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* AI Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-200 text-sm text-blue-600 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          생성형 AI × 디지털 마케팅 × 바이브코딩
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-slate-900">생성형 AI로 배우는</span>
          <br />
          <span className="gradient-text-main">실무 중심 디지털</span>
          <br />
          <span className="gradient-text-main">콘텐츠 마케팅</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-4"
        >
          ChatGPT · Gemini · Claude · Runway · Canva AI
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-slate-500 text-base md:text-lg max-w-xl mx-auto mb-10"
        >
          실무 프로젝트 기반 생성형 AI 마케팅 교육
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={onApply}
            className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#0F172A] to-[#2563EB] text-white font-semibold rounded-2xl shadow-lg shadow-blue-900/40 hover:shadow-blue-900/60 hover:scale-105 transition-all duration-200"
          >
            수강신청
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="#curriculum"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold bg-gradient-to-r from-blue-600/30 to-blue-600/30 border border-blue-400/50 hover:from-blue-600/50 hover:to-blue-600/50 hover:border-blue-400/80 hover:scale-105 transition-all duration-200"
          >
            <span className="gradient-text font-semibold">커리큘럼 보기</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
              className="glass-card rounded-2xl p-4 text-center"
            >
              <stat.icon className="w-5 h-5 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* AI Tool Badges — Stats 아래 전용 공간, 텍스트 가림 없음 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {[
            { label: 'ChatGPT',  delay: 0   },
            { label: 'Claude AI', delay: 0.5 },
            { label: 'Gemini',   delay: 1.0 },
            { label: 'Runway',   delay: 1.5 },
            { label: 'Canva AI', delay: 2.0 },
          ].map(badge => (
            <div
              key={badge.label}
              className="glass border border-blue-200 text-blue-600 text-xs px-4 py-2 rounded-full animate-float whitespace-nowrap"
              style={{ animationDelay: `${badge.delay}s` }}
            >
              ✦ {badge.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
