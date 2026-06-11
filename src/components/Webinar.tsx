import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Calendar, Video, CheckCircle2, ArrowRight } from 'lucide-react'

const benefits = [
  '코딩 지식 0에서 실제 작동하는 웹앱 완성까지',
  'Claude AI + Cursor로 개발자 없이 직접 서비스 배포',
  '마케터·기획자를 위한 실무 바이브코딩 워크플로우',
]

export default function Webinar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="webinar" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/60 to-transparent" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[400px] bg-blue-50 rounded-full blur-[130px] pointer-events-none" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* ── Left: Copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-4">
              고민이 되신다면?
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
              AI 마케팅 무료 웨비나
              <br />
              지금 바로 체험하세요
            </h2>

            <p className="text-gray-600 text-base leading-relaxed mb-8">
              AI 바이브코딩이 궁금하신가요?<br />
              7월 1일 무료 LIVE 특강으로 먼저 경험해보실 수 있습니다.
            </p>

            <ul className="space-y-3.5">
              {benefits.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm leading-relaxed">{b}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ── Right: Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="glass-card rounded-2xl overflow-hidden border border-blue-500/20">
              {/* Card Header */}
              <div className="bg-blue-500/10 px-6 py-4 flex items-center gap-3 border-b border-blue-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <span className="text-red-500 text-xs font-bold uppercase tracking-widest">LIVE</span>
                <span className="text-gray-600 text-xs">·</span>
                <span className="text-blue-600 text-sm font-semibold">무료 웨비나</span>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h3 className="text-gray-900 font-bold text-xl mb-1 leading-snug">
                  AI 바이브코딩
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  코딩 없이 Claude AI로 앱 만들기 실전 특강
                </p>

                {/* Info Rows */}
                <div className="space-y-3 mb-7">
                  <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
                    <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="text-gray-900 text-sm font-medium">2026.07.01(수) 19:00 ~ 21:00</p>
                      <p className="text-gray-500 text-xs mt-0.5">ZOOM 실시간 온라인 참여</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
                    <Video className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="text-gray-900 text-sm font-medium">
                        교육비&nbsp;
                        <span className="text-blue-600 font-bold">무료</span>
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">사전 신청 후 참여 가능</p>
                    </div>
                  </div>
                </div>

                {/* CTA — dark style */}
                <a
                  href="#webinar"
                  className="flex items-center justify-between w-full px-6 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all duration-200 group text-sm"
                >
                  <span>과정 상세보기</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </a>

                <p className="text-gray-400 text-xs text-center mt-3">
                  신청 기간: 2026.06.15 ~ 2026.07.01
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
