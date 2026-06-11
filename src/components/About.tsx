import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, Award, Briefcase, BookOpen, Building2, Star } from 'lucide-react'

const careerItems = [
  { org: '메가스터디 김영 평생교육원', role: '운영교수', field: '디지털 마케팅', current: true },
  { org: '유비온', role: '교수', field: '경영지도사 마케팅', current: false },
  { org: '여성인력개발원', role: '강사', field: '디지털 마케팅', current: false },
  { org: '한국정보통신진흥협회', role: '컨설턴트', field: '디지털 마케팅 컨설팅', current: false },
  { org: '대명스테이션', role: '마케팅기획팀 차장', field: '디지털 마케팅 전략수립', current: false },
  { org: '중앙일보마케팅', role: '마케팅기획팀 과장', field: '디지털 마케팅 전략수립', current: false },
  { org: '롯데쇼핑', role: '마케팅기획팀 대리', field: '디지털 마케팅 전략수립', current: false },
  { org: 'KTCS', role: '마케팅기획팀', field: '디지털 마케팅 전략 수립', current: false },
]

const credentials = [
  { icon: GraduationCap, title: '경희대학교 대학원', sub: '경영학 석사', color: 'text-blue-400' },
  { icon: Award, title: '경영지도사', sub: '자격증 취득 (2021)', color: 'text-blue-400' },
  { icon: BookOpen, title: '직업능력개발 훈련교사', sub: '경영전략·마케팅 분야', color: 'text-blue-400' },
  { icon: Star, title: '용인시 산업진흥원', sub: '경영전략 전문위원', color: 'text-emerald-400' },
]

const stats = [
  { value: '5년', label: '강의 경력', icon: BookOpen, color: 'text-blue-400' },
  { value: '11년', label: '기업 실무경력', icon: Briefcase, color: 'text-blue-400' },
  { value: '5년', label: '컨설팅 경력', icon: Building2, color: 'text-emerald-400' },
  { value: '21년+', label: '총 경력', icon: Star, color: 'text-blue-400' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-600/8 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
            About Instructor
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            AI 마케팅 전문 강사 소개
          </h2>
          <p className="text-stone-300 text-lg max-w-2xl mx-auto">
            기업 실무 11년 · 강의 5년 · 컨설팅 5년의 현장 중심 디지털 마케팅 전문가
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={1}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card rounded-2xl p-5 text-center">
              <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
              <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-stone-400 text-xs">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left — Leader Image (모바일: 맨 아래 / 데스크탑: 왼쪽) */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={2}
            className="order-3 lg:order-1"
          >
            <img
              src={`${import.meta.env.BASE_URL}leader.jpg`}
              alt="Leader 매거진"
              className="w-full rounded-2xl shadow-xl shadow-blue-900/15 border border-blue-500/25"
            />
          </motion.div>

          {/* Right — Profile + Credentials + Career (모바일: 위 / 데스크탑: 오른쪽) */}
          <div className="space-y-4 order-1 lg:order-2">

            {/* Profile Card */}
            <motion.div
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={3}
              className="glass-card rounded-2xl p-6 border border-blue-500/25 bg-gradient-to-br from-blue-200/20 to-blue-950/30"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`${import.meta.env.BASE_URL}profile.jpg`}
                  alt="강사 프로필"
                  className="w-20 h-20 rounded-2xl object-cover object-top shadow-lg shadow-blue-900/20 border border-blue-500/25 flex-shrink-0"
                />
                <div>
                  <h3 className="text-white font-bold text-xl mb-1">디지털 마케팅 전문 강사</h3>
                  <p className="text-blue-400 text-sm font-medium">경영지도사 · MBA</p>
                </div>
              </div>
              <p className="text-stone-300 text-sm leading-relaxed mt-4">
                롯데쇼핑·중앙일보마케팅·대명스테이션 등 대기업 마케팅 기획팀 출신으로,
                현장 실무 경험을 바탕으로 한 생생한 디지털 마케팅 교육을 제공합니다.
                현재 메가스터디에서 디지털 마케팅 운영교수로 활동 중입니다.
              </p>
            </motion.div>

            {/* Credentials — 2열 그리드 */}
            <div className="grid grid-cols-2 gap-3">
              {credentials.map((cred, i) => (
                <motion.div
                  key={cred.title}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  variants={fadeUp}
                  custom={4 + i * 0.5}
                  className="glass-card rounded-xl p-4 flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <cred.icon className={`w-4 h-4 ${cred.color}`} />
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{cred.title}</div>
                    <div className="text-stone-400 text-xs">{cred.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Career Timeline */}
            <motion.div
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={6}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="w-5 h-5 text-blue-400" />
                <h3 className="text-white font-bold text-lg">주요 경력</h3>
              </div>

              <div className="relative space-y-0">
                <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/60 via-blue-500/40 to-transparent" />
                {careerItems.map((item, i) => (
                  <motion.div
                    key={item.org}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={fadeUp}
                    custom={7 + i * 0.4}
                    className="relative flex items-start gap-4 pb-5 last:pb-0"
                  >
                    <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      item.current
                        ? 'bg-gradient-to-br from-blue-500 to-blue-500 shadow-lg shadow-blue-900/40'
                        : 'bg-white/10 border border-neutral-700'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${item.current ? 'bg-white/5' : 'bg-[#1A1A1A]0'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white font-semibold text-sm">{item.org}</span>
                        {item.current && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-600/30 text-blue-400 border border-blue-500/25">
                            현재
                          </span>
                        )}
                      </div>
                      <div className="text-stone-300 text-xs mt-0.5">{item.role}</div>
                      <div className="text-blue-500/70 text-xs mt-0.5">{item.field}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Extra badges */}
              <div className="mt-5 pt-5 border-t border-white/10">
                <p className="text-stone-400 text-xs mb-3">기타 활동</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    '소상공인시장진흥공단 컨설턴트',
                    'KAIT 디지털전환 컨설턴트',
                    '공공기관 채용시험 출제위원',
                    '내일배움카드 강사',
                    '용인시 산업진흥원 전문위원',
                  ].map(badge => (
                    <span
                      key={badge}
                      className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-stone-300 border border-white/10"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Philosophy Banner */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={10}
          className="mt-6 glass-card rounded-2xl p-6 border border-blue-500/25 bg-gradient-to-r from-blue-200/10 to-blue-200/10 text-center"
        >
          <p className="text-stone-200 text-base md:text-lg italic">
            "AI 툴은 도구입니다. 중요한 건 <span className="gradient-text font-semibold not-italic">전략과 창의력</span>입니다."
          </p>
          <p className="text-stone-400 text-sm mt-2">
            기업 실무 · 마케팅 컨설팅 · 강의 현장에서 직접 검증한 노하우를 그대로 전달합니다.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
