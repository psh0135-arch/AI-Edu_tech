import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Trophy, Briefcase, Star, Rocket } from 'lucide-react'

const stats = [
  { icon: Trophy, value: '100H+', label: '완성형 커리큘럼', sub: '7단계 체계 구성', color: 'text-amber-400' },
  { icon: Briefcase, value: '25회', label: '라이브 세션', sub: '실시간 실습 수업', color: 'text-blue-400' },
  { icon: Star, value: 'AI 프로젝트', label: '직접 완성', sub: '포트폴리오 기반 교육', color: 'text-purple-400' },
  { icon: Rocket, value: '포트폴리오', label: '취업 연결', sub: '커리어 전환 지원', color: 'text-cyan-400' },
]

const outcomes = [
  { title: '취업 / 이직', desc: 'AI 마케터, 콘텐츠 크리에이터, 디지털 마케팅 전략가 포지션으로 커리어 전환', emoji: '💼' },
  { title: '프리랜서 활동', desc: 'AI 툴 기반 콘텐츠 제작 및 마케팅 컨설팅으로 월 수익 창출', emoji: '🧑‍💻' },
  { title: '창업 / 부업', desc: 'AI 자동화 기반 1인 마케팅 비즈니스 론칭 및 사이드 프로젝트 운영', emoji: '🚀' },
  { title: '사내 AI 도입', desc: '재직 중인 기업에 생성형 AI 워크플로우 도입 및 업무 효율화 실현', emoji: '🏢' },
]

export default function Outcomes() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="outcomes" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-600/8 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Outcomes
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            수강생 성과
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            강의 수료 후 실제 커리어와 실무에서 만들어낸 변화들
          </p>
        </motion.div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <stat.icon className={`w-7 h-7 ${stat.color} mx-auto mb-3`} />
              <div className={`text-2xl md:text-3xl font-bold gradient-text mb-1`}>{stat.value}</div>
              <div className="text-white text-sm font-medium mb-1">{stat.label}</div>
              <div className="text-slate-500 text-xs">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Outcome Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {outcomes.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="glass-card rounded-2xl p-6 flex items-start gap-4"
            >
              <div className="text-3xl flex-shrink-0">{item.emoji}</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
