import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import CurriculumRoadmap from './CurriculumRoadmap'

const steps = [
  {
    step: 'STEP 1',
    title: 'AI 리터러시',
    desc: '생성형 AI의 기본 개념과 활용 원리를 이해하고, 프롬프트 엔지니어링 핵심 기법을 습득합니다.',
    tools: ['ChatGPT', 'Claude', 'Gemini'],
    outcomes: ['AI 개념 이해', '프롬프트 작성', '모델별 특성 파악'],
    hours: '8H',
    color: 'from-purple-600 to-purple-800',
    glow: 'shadow-purple-600/40',
    border: 'border-purple-500/40',
  },
  {
    step: 'STEP 2',
    title: '멀티모달 AI 이해',
    desc: '텍스트, 이미지, 영상, 음성을 아우르는 멀티모달 AI 활용법으로 창의적 콘텐츠를 제작합니다.',
    tools: ['DALL·E', 'Midjourney', 'Runway', 'SUNO'],
    outcomes: ['AI 이미지 생성', 'AI 영상 제작', 'AI 음악 생성'],
    hours: '12H',
    color: 'from-violet-600 to-violet-800',
    glow: 'shadow-violet-600/40',
    border: 'border-violet-500/40',
  },
  {
    step: 'STEP 3',
    title: '디지털 콘텐츠 제작',
    desc: 'Canva AI, Gamma 등 AI 디자인 툴을 활용해 브랜드 콘텐츠와 숏폼 영상을 제작합니다.',
    tools: ['Canva AI', 'Gamma', 'CapCut', 'Runway'],
    outcomes: ['SNS 콘텐츠 제작', '숏폼 영상', 'AI 프레젠테이션'],
    hours: '16H',
    color: 'from-fuchsia-600 to-fuchsia-800',
    glow: 'shadow-fuchsia-600/40',
    border: 'border-fuchsia-500/40',
  },
  {
    step: 'STEP 4',
    title: 'AI 마케팅 자동화',
    desc: 'Make(Integromat)를 활용한 마케팅 자동화 워크플로우 구축과 AI 챗봇 제작을 실습합니다.',
    tools: ['Make', 'ChatGPT API', 'Zapier', 'NotebookLM'],
    outcomes: ['자동화 워크플로', 'AI 챗봇 제작', '데이터 분석'],
    hours: '16H',
    color: 'from-cyan-600 to-cyan-800',
    glow: 'shadow-cyan-600/40',
    border: 'border-cyan-500/40',
  },
  {
    step: 'STEP 5',
    title: '디지털 마케팅 전략',
    desc: 'SEO, SNS, 퍼포먼스 마케팅, 콘텐츠 전략을 AI와 결합한 통합 디지털 마케팅 전략을 수립합니다.',
    tools: ['ChatGPT', 'Google Analytics', 'Meta Ads', 'Semrush'],
    outcomes: ['마케팅 전략 수립', 'SEO 최적화', '광고 캠페인'],
    hours: '18H',
    color: 'from-blue-600 to-blue-800',
    glow: 'shadow-blue-600/40',
    border: 'border-blue-500/40',
  },
  {
    step: 'STEP 6',
    title: '바이브코딩 실습',
    desc: 'Cursor AI와 Claude Code를 활용해 코딩 경험 없이도 웹앱과 랜딩 페이지를 직접 제작합니다.',
    tools: ['Cursor AI', 'Claude Code', 'v0.dev', 'Vercel'],
    outcomes: ['웹앱 프로토타입', '랜딩 페이지', 'AI 코드 리뷰'],
    hours: '18H',
    color: 'from-emerald-600 to-emerald-800',
    glow: 'shadow-emerald-600/40',
    border: 'border-emerald-500/40',
  },
  {
    step: 'STEP 7',
    title: '포트폴리오 프로젝트',
    desc: '지금까지 배운 모든 AI 스킬을 활용해 실제 포트폴리오 프로젝트를 완성하고 발표합니다.',
    tools: ['모든 AI 툴', 'GitHub', 'Notion', 'Behance'],
    outcomes: ['포트폴리오 완성', '최종 발표', '취업/창업 연결'],
    hours: '12H',
    color: 'from-amber-600 to-amber-800',
    glow: 'shadow-amber-600/40',
    border: 'border-amber-500/40',
  },
]

export default function Curriculum() {
  const [active, setActive] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' })
  }

  return (
    <section id="curriculum" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Curriculum
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            생성형 AI 마케팅 100시간 커리큘럼
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            7단계 체계적 커리큘럼으로 AI 마케팅 전문가로 성장하세요
          </p>
        </motion.div>

        {/* Timeline Scroll */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full glass border border-purple-500/30 text-white flex items-center justify-center hover:bg-purple-600/20 transition-all hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full glass border border-purple-500/30 text-white flex items-center justify-center hover:bg-purple-600/20 transition-all hidden md:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Scrollable Cards */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setActive(i)}
                className={`flex-shrink-0 w-72 snap-start cursor-pointer rounded-2xl p-5 transition-all duration-300 border ${step.border} ${
                  active === i
                    ? `bg-gradient-to-br ${step.color} shadow-xl ${step.glow}`
                    : 'glass-card hover:border-opacity-60'
                }`}
              >
                {/* Step Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    active === i ? 'bg-white/20 text-white' : 'bg-purple-600/20 text-purple-400'
                  }`}>
                    {step.step}
                  </span>
                  <span className={`text-xs font-semibold ${active === i ? 'text-white/70' : 'text-slate-500'}`}>
                    {step.hours}
                  </span>
                </div>

                <h3 className={`text-lg font-bold mb-2 ${active === i ? 'text-white' : 'text-slate-200'}`}>
                  {step.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-4 ${active === i ? 'text-white/80' : 'text-slate-500'}`}>
                  {step.desc}
                </p>

                {/* Tools */}
                <div className="mb-3">
                  <p className={`text-xs font-semibold mb-2 ${active === i ? 'text-white/60' : 'text-slate-600'}`}>
                    실습 툴
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {step.tools.map(tool => (
                      <span
                        key={tool}
                        className={`text-xs px-2 py-0.5 rounded-md ${
                          active === i ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Outcomes */}
                <div>
                  <p className={`text-xs font-semibold mb-2 ${active === i ? 'text-white/60' : 'text-slate-600'}`}>
                    학습 결과
                  </p>
                  <ul className="space-y-1">
                    {step.outcomes.map(out => (
                      <li key={out} className={`text-xs flex items-center gap-1.5 ${active === i ? 'text-white/80' : 'text-slate-500'}`}>
                        <span className={`w-1 h-1 rounded-full flex-shrink-0 ${active === i ? 'bg-white' : 'bg-purple-500'}`} />
                        {out}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8"
        >
          <div className="flex justify-between text-xs text-slate-600 mb-2">
            <span>시작</span>
            <span className="text-purple-400 font-semibold">총 100시간 완성 과정</span>
            <span>수료</span>
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 transition-all duration-500"
              style={{ width: `${((active + 1) / steps.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  i <= active ? 'bg-purple-500' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Roadmap Section */}
        <CurriculumRoadmap />
      </div>
    </section>
  )
}
