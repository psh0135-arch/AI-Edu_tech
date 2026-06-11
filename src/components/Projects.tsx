import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink } from 'lucide-react'

const projects = [
  {
    title: 'AI 이미지 브랜딩',
    desc: 'Midjourney & Canva AI로 브랜드 아이덴티티 시각화 및 SNS 콘텐츠 패키지 제작',
    tag: '디자인',
    emoji: '🖼️',
    gradient: 'from-pink-900/40 to-blue-200/40',
    border: 'border-pink-500/30',
    colSpan: 'md:col-span-1',
    rowSpan: '',
  },
  {
    title: '숏폼 영상 제작',
    desc: 'Runway + CapCut AI 자동화로 30초 숏폼 콘텐츠 대량 생산 파이프라인 구축',
    tag: '영상',
    emoji: '🎬',
    gradient: 'from-red-900/40 to-orange-900/40',
    border: 'border-red-500/30',
    colSpan: 'md:col-span-2',
    rowSpan: '',
  },
  {
    title: 'AI 챗봇 제작',
    desc: 'ChatGPT API + Make를 활용한 고객 응대 자동화 챗봇 구현 및 카카오톡 연동',
    tag: '자동화',
    emoji: '🤖',
    gradient: 'from-emerald-900/40 to-blue-200/40',
    border: 'border-emerald-500/30',
    colSpan: 'md:col-span-2',
    rowSpan: '',
  },
  {
    title: '마케팅 자동화',
    desc: 'Make 자동화 플로우로 리드 수집 → 이메일 발송 → 보고서 생성 완전 자동화',
    tag: '자동화',
    emoji: '⚙️',
    gradient: 'from-indigo-900/40 to-blue-900/40',
    border: 'border-indigo-500/30',
    colSpan: 'md:col-span-1',
    rowSpan: '',
  },
  {
    title: '웹앱 프로토타입',
    desc: 'Cursor AI로 코딩 지식 없이 랜딩 페이지 및 미니 웹앱 제작 후 Vercel 배포',
    tag: '바이브코딩',
    emoji: '💻',
    gradient: 'from-yellow-900/40 to-blue-200/40',
    border: 'border-blue-500/25',
    colSpan: 'md:col-span-1',
    rowSpan: '',
  },
  {
    title: '포트폴리오 제작',
    desc: 'Notion + Gamma AI로 취업·프리랜서용 AI 마케터 포트폴리오 완성 및 발표',
    tag: '포트폴리오',
    emoji: '📁',
    gradient: 'from-blue-200/40 to-yellow-900/40',
    border: 'border-blue-500/25',
    colSpan: 'md:col-span-2',
    rowSpan: '',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-64 bg-blue-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Projects
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            생성형 AI 활용 실무 포트폴리오 프로젝트
          </h2>
          <p className="text-stone-300 text-lg max-w-2xl mx-auto">
            강의에서 직접 완성하는 6가지 실습 프로젝트로 포트폴리오를 채우세요
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative rounded-2xl p-6 bg-gradient-to-br ${project.gradient} border ${project.border} ${project.colSpan} cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02]`}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              {/* Tag */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/70 border border-white/10">
                  {project.tag}
                </span>
                <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors" />
              </div>

              {/* Emoji */}
              <div className="text-4xl mb-3">{project.emoji}</div>

              {/* Content */}
              <h3 className="text-white font-bold text-lg mb-2">{project.title}</h3>
              <p className="text-stone-300 text-sm leading-relaxed">{project.desc}</p>

              {/* Bottom accent */}
              <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-blue-500 transition-all duration-500 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
