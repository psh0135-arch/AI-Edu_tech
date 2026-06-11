import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: '비전공자도 수강 가능한가요?',
    a: '네, 완전히 가능합니다. 본 강의는 기술 배경이 없는 분들도 이해할 수 있도록 설계되었습니다. 마케팅, 디자인, 기획 직군 등 다양한 배경의 수강생들이 성공적으로 수료했습니다.',
  },
  {
    q: 'AI 툴 사용 경험이 없어도 되나요?',
    a: '물론입니다. ChatGPT 기초부터 시작해 단계적으로 심화 툴을 다룹니다. 처음부터 함께 설치하고 사용하며, 모든 실습이 따라하기 방식으로 진행됩니다.',
  },
  {
    q: '온라인 수업인가요, 오프라인인가요?',
    a: '오프라인 방식으로 진행됩니다. 단, 필요시 온라인 실시간 Zoom을 통해 실시간 강의와 질의응답이 이루어지며, 수업 후 녹화 영상을 제공해 복습이 가능합니다.',
  },
  {
    q: '실습 중심으로 진행되나요?',
    a: '네, 전체 강의의 70% 이상이 실습으로 구성됩니다. 강의 이론보다 실제 툴을 사용하고 프로젝트를 완성하는 것을 핵심 목표로 합니다.',
  },
  {
    q: '수료 후 포트폴리오를 만들 수 있나요?',
    a: '수료 시점에 AI 프로젝트 6가지와 함께 완성된 포트폴리오를 갖게 됩니다. 취업·이직·프리랜서 활동에 바로 활용할 수 있는 수준으로 완성됩니다.',
  },
  {
    q: '환불 정책은 어떻게 되나요?',
    a: '수강 시작 후 3회 수업 이내에 환불 신청 시 전액 환불이 가능합니다. 수강 전 상담을 통해 본인의 목적과 수준에 맞는지 먼저 확인하시길 권장합니다.',
  },
  {
    q: '코딩을 배워야 하나요?',
    a: '코딩 없이도 강의의 대부분을 수행할 수 있습니다. 바이브코딩 세션에서 Cursor AI와 Claude Code를 사용해 코딩 없이 웹앱을 만드는 방법을 배웁니다.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="faq" className="py-24 relative" ref={ref}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
            FAQ
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            AI 디지털 마케팅 강의 자주 묻는 질문
          </h2>
          <p className="text-stone-300 text-lg">
            궁금한 점이 있으시면 언제든지 상담 신청을 해주세요
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`glass-card rounded-2xl overflow-hidden border transition-all duration-300 ${
                openIndex === i ? 'border-blue-500/40' : 'border-white/10'
              }`}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-white font-medium pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-blue-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-stone-300 text-sm leading-relaxed border-t border-white/10 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
