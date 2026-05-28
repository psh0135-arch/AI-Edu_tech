import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Sparkles, Users, Clock } from 'lucide-react'

const stats = [
  { icon: Clock, value: '100H+', label: '강의 시간' },
  { icon: BookOpen, value: '25회', label: '세션 수업' },
  { icon: Users, value: '500+', label: '수강생' },
  { icon: Sparkles, value: '7단계', label: 'AI 커리큘럼' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern pt-16">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* AI Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 text-sm text-purple-300 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          생성형 AI × 디지털 마케팅 × 바이브코딩
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-white">생성형 AI로 배우는</span>
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
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-4"
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
          <a
            href="#contact"
            className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-2xl shadow-lg shadow-purple-900/40 hover:shadow-purple-900/60 hover:scale-105 transition-all duration-200"
          >
            강의 상담 신청
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#curriculum"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold bg-gradient-to-r from-purple-600/30 to-cyan-600/30 border border-purple-400/50 hover:from-purple-600/50 hover:to-cyan-600/50 hover:border-purple-400/80 hover:scale-105 transition-all duration-200"
          >
            <span className="gradient-text font-semibold">커리큘럼 보기</span>
            <BookOpen className="w-4 h-4 text-cyan-400" />
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
              <stat.icon className="w-5 h-5 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating Tool Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="hidden lg:block"
        >
          {[
            { label: 'ChatGPT', x: '-40%', y: '-80%', delay: 0 },
            { label: 'Claude AI', x: '45%', y: '-70%', delay: 0.3 },
            { label: 'Runway', x: '-45%', y: '40%', delay: 0.6 },
            { label: 'Canva AI', x: '42%', y: '35%', delay: 0.9 },
          ].map(badge => (
            // 위치 transform과 float 애니메이션 transform을 분리해 충돌 방지
            <div
              key={badge.label}
              className="absolute pointer-events-none"
              style={{ left: '50%', top: '50%', transform: `translate(${badge.x}, ${badge.y})` }}
            >
              <div
                className="glass border border-cyan-500/20 text-cyan-300 text-xs px-3 py-1.5 rounded-full animate-float whitespace-nowrap"
                style={{ animationDelay: `${badge.delay}s` }}
              >
                ✦ {badge.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
