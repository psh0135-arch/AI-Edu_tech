import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, Layers, Bot, BarChart3, Code2, CheckCircle2, ChevronRight } from 'lucide-react'

const phases = [
  {
    id: 'phase1',
    label: 'PHASE 1.',
    title: 'AI 리터러시 및\n콘텐츠 제작\n기술 습득',
    color: 'from-purple-600 to-purple-600',
    borderColor: 'border-purple-500/40',
    glowColor: 'shadow-purple-900/20',
    bgColor: 'from-purple-900/20 to-purple-200/20',
    sessions: [
      {
        icon: Brain,
        title: 'AI 리터러시 및 프롬프트 엔지니어링',
        range: '1~4차시',
        rangeColor: 'text-purple-400',
        barColor: 'from-purple-500 to-cyan-500',
        barWidth: '35%',
        desc: 'LLM의 원리를 이해하고 업무 생산성 향상을 위한 맞춤형 프롬프트 설계 기술을 습득합니다.',
        tools: ['ChatGPT', 'Claude', 'Gemini'],
      },
      {
        icon: Layers,
        title: '멀티모달 기반 디지털 콘텐츠 제작',
        range: '5~11차시',
        rangeColor: 'text-pink-400',
        barColor: 'from-pink-500 to-purple-500',
        barWidth: '70%',
        desc: '이미지(Adobe Firefly), 영상(Runway, SORA), 음원(SUNO) 생성 AI를 활용해 창의적인 콘텐츠를 직접 제작합니다.',
        tools: ['Adobe Firefly', 'Runway', 'SORA', 'SUNO'],
      },
    ],
  },
  {
    id: 'phase2',
    label: 'PHASE 2.',
    title: '마케팅 자동화\n및 실무 전략\n고도화',
    color: 'from-purple-600 to-pink-600',
    borderColor: 'border-purple-500/40',
    glowColor: 'shadow-purple-900/20',
    bgColor: 'from-purple-200/20 to-pink-900/20',
    sessions: [
      {
        icon: Bot,
        title: 'AI 마케팅 자동화 및 챗봇 구축',
        range: '12~15차시',
        rangeColor: 'text-purple-400',
        barColor: 'from-purple-400 to-purple-500',
        barWidth: '60%',
        desc: 'NotebookLM과 GPTs를 활용해 문서 자동화와 나만의 맞춤형 AI 챗봇 워크플로우를 설계합니다.',
        tools: ['NotebookLM', 'GPTs', 'Make'],
      },
      {
        icon: BarChart3,
        title: '데이터 기반 마케팅 전략 및 성과 분석',
        range: '16~21차시',
        rangeColor: 'text-pink-400',
        barColor: 'from-pink-500 to-rose-500',
        barWidth: '87%',
        desc: '디지털 플랫폼 기반의 STP 전략을 수립하고 인스타그램, 유튜브, 블로그 광고 성과를 분석합니다.',
        tools: ['Instagram', 'YouTube', 'Blog', 'Google Analytics'],
      },
      {
        icon: Code2,
        title: '노코드 협업 및 최종 포트폴리오',
        range: '22~24차시',
        rangeColor: 'text-emerald-400',
        barColor: 'from-emerald-400 to-purple-500',
        barWidth: '100%',
        desc: 'AI 협업 툴(Cursor AI)을 통한 프로토타입 제작과 실무 역량을 증명하는 최종 포트폴리오를 완성합니다.',
        tools: ['Cursor AI', 'Vercel', 'Notion'],
      },
    ],
  },
]

const TOTAL = 24

function TimelineBar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const ticks = Array.from({ length: TOTAL }, (_, i) => i + 1)

  return (
    <div ref={ref} className="glass-card rounded-2xl p-5 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-stone-300 tracking-widest uppercase">Phases & Steps</span>
        </div>
        <div className="text-center flex-1 px-4">
          <span className="text-xs font-bold text-stone-300 tracking-widest uppercase">Timeline & Progress</span>
          <p className="text-xs text-stone-400">타임라인 및 진행</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/30">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs font-bold text-emerald-400">COMPLETE</span>
        </div>
      </div>

      {/* Tick Bar */}
      <div className="relative">
        {/* Track */}
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '100%' } : {}}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
            className="h-full rounded-full bg-gradient-to-r from-purple-500 via-purple-500 to-emerald-400"
          />
        </div>
        {/* Tick labels */}
        <div className="flex justify-between mt-2 px-0.5">
          <span className="text-xs text-purple-400 font-bold">START</span>
          <div className="flex gap-0 flex-1 justify-around px-2">
            {ticks.map(n => (
              <span key={n} className="text-stone-400 text-[9px] leading-none">{n}</span>
            ))}
          </div>
          <span className="text-xs text-emerald-400 font-bold">관료</span>
        </div>
      </div>
    </div>
  )
}

export default function CurriculumRoadmap() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="mt-16 pt-12 border-t border-white/10">
      {/* Sub-header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-500/25 text-xs text-purple-400 mb-4">
          <ChevronRight className="w-3 h-3" />
          로드맵 상세 가이드
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          생성형 AI 활용과 디지털 마케팅 마스터 과정
        </h3>
        <p className="text-stone-400 text-sm">24단계 성공 가이드 · 2-Phase 구조</p>
      </motion.div>

      {/* Timeline Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <TimelineBar />
      </motion.div>

      {/* Phases */}
      <div className="space-y-4">
        {phases.map((phase, pi) => (
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 + pi * 0.15 }}
            className={`rounded-2xl border ${phase.borderColor} bg-gradient-to-br ${phase.bgColor} shadow-xl ${phase.glowColor} overflow-hidden`}
          >
            <div className="flex flex-col md:flex-row">
              {/* Phase Label */}
              <div className={`md:w-44 flex-shrink-0 bg-gradient-to-br ${phase.color} p-5 flex flex-col justify-center`}>
                <div className="text-white/70 text-xs font-bold tracking-widest mb-1">{phase.label}</div>
                <div className="text-white font-bold text-base leading-snug whitespace-pre-line">
                  {phase.title}
                </div>
              </div>

              {/* Sessions */}
              <div className="flex-1 p-5 space-y-5 divide-y divide-gray-200">
                {phase.sessions.map((session, si) => (
                  <motion.div
                    key={session.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + pi * 0.15 + si * 0.1 }}
                    className={si > 0 ? 'pt-5' : ''}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <session.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-white font-bold text-sm">{session.title}</span>
                          <span className={`text-xs font-bold ${session.rangeColor}`}>({session.range})</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: session.barWidth } : {}}
                            transition={{ duration: 1, ease: 'easeOut', delay: 0.5 + pi * 0.2 + si * 0.1 }}
                            className={`h-full rounded-full bg-gradient-to-r ${session.barColor}`}
                          />
                        </div>
                        <p className="text-stone-300 text-xs leading-relaxed mb-2">{session.desc}</p>
                        <div className="flex flex-wrap gap-1">
                          {session.tools.map(tool => (
                            <span
                              key={tool}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-white/60 border border-white/10"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* SUCCESS badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="flex justify-end mt-4"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600/20 to-purple-600/20 border border-emerald-500/30">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-bold text-emerald-300">SUCCESS — 포트폴리오 완성</span>
        </div>
      </motion.div>
    </div>
  )
}
