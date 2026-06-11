import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { MessageCircle, Mail, FileText, ArrowRight, Sparkles } from 'lucide-react'
import ApplyModal from './ApplyModal'

const channels = [
  {
    icon: MessageCircle,
    title: '카카오톡 상담',
    desc: '빠른 1:1 상담 및 수강 문의',
    action: '카카오톡으로 문의',
    gradient: 'from-yellow-500 to-amber-600',
    href: 'http://pf.kakao.com/_xecRAG',
  },
  {
    icon: FileText,
    title: '수강 신청',
    desc: '신청서 작성 후 빠르게 연락 드립니다',
    action: '수강 신청하기',
    gradient: 'from-amber-500 to-yellow-600',
    href: '#modal',
  },
  {
    icon: Mail,
    title: '이메일 문의',
    desc: '상세한 교육 제안서 및 견적 요청',
    action: '이메일 보내기',
    gradient: 'from-amber-500 to-yellow-600',
    href: 'mailto:psh0135@gmail.com',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section id="contact" className="py-24 relative overflow-hidden" ref={ref}>
      <ApplyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-900/20 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-amber-500/30 text-sm text-amber-300 mb-8">
            <Sparkles className="w-4 h-4" />
            지금 시작하면 가장 빠릅니다
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            지금 생성형 AI 마케팅을
            <br />
            <span className="gradient-text">시작하세요</span>
          </h2>
          <p className="text-stone-300 text-base md:text-lg max-w-3xl mx-auto mb-10">
            100시간 완성 커리큘럼으로 AI 마케팅 전문가가 되는 여정을 지금 바로 시작하세요.<br />수강 상담은 무료입니다.
          </p>

          {/* Main CTA */}
          <motion.a
            href="http://pf.kakao.com/_xecRAG"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black text-lg font-bold rounded-2xl shadow-xl hover:bg-slate-100 transition-all duration-200"
          >
            수강 신청 상담하기
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* Contact Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {channels.map((ch, i) => (
            <motion.div
              key={ch.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="group glass-card rounded-2xl p-6 text-center cursor-pointer"
              onClick={() => {
                if (ch.href === '#modal') {
                  setModalOpen(true)
                } else if (ch.href.startsWith('mailto:')) {
                  const a = document.createElement('a')
                  a.href = ch.href
                  document.body.appendChild(a)
                  a.click()
                  document.body.removeChild(a)
                } else if (ch.href !== '#') {
                  window.open(ch.href, '_blank', 'noopener,noreferrer')
                }
              }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ch.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <ch.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{ch.title}</h3>
              <p className="text-stone-300 text-sm mb-3">{ch.desc}</p>
              {ch.href.startsWith('mailto:') && (
                <p className="text-stone-400 text-xs mb-3 font-mono">{ch.href.replace('mailto:', '')}</p>
              )}
              <span className="inline-flex items-center gap-1 text-sm text-amber-400 font-medium group-hover:gap-2 transition-all">
                {ch.action}
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </motion.div>
          ))}
        </div>

        {/* Sticky Mobile CTA */}
        <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
          <a
            href="http://pf.kakao.com/_xecRAG"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold rounded-2xl shadow-2xl shadow-amber-900/50"
          >
            <MessageCircle className="w-5 h-5" />
            카카오톡 상담 신청
          </a>
        </div>
      </div>
    </section>
  )
}
