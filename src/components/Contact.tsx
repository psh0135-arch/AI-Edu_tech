import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { MessageCircle, Mail, FileText, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'
import ApplyModal from './ApplyModal'

const CONTACT_EMAIL = 'psh0135@gmail.com'

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
    gradient: 'from-blue-500 to-cyan-600',
    href: '#modal',
  },
  {
    icon: Mail,
    title: '이메일 문의',
    desc: '상세한 교육 제안서 및 견적 요청',
    action: '이메일 보내기',
    gradient: 'from-purple-500 to-violet-600',
    href: `mailto:${CONTACT_EMAIL}`,
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [modalOpen, setModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // 클립보드 API 미지원 브라우저는 mailto: 링크 동작만 진행
    }
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden" ref={ref}>
      <ApplyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* 복사 완료 토스트 */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-20 left-1/2 z-[100] flex items-center gap-2 px-5 py-3 rounded-xl glass border border-emerald-500/30 text-emerald-300 text-sm font-medium shadow-xl"
          >
            <CheckCircle2 className="w-4 h-4" />
            이메일 주소가 복사되었습니다
          </motion.div>
        )}
      </AnimatePresence>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-900/20 rounded-full blur-[150px]" />
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 text-sm text-purple-300 mb-8">
            <Sparkles className="w-4 h-4" />
            지금 시작하면 가장 빠릅니다
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            지금 생성형 AI 마케팅을
            <br />
            <span className="gradient-text">시작하세요</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto mb-10">
            100시간 완성 커리큘럼으로 AI 마케팅 전문가가 되는 여정을 지금 바로 시작하세요.<br />수강 상담은 무료입니다.
          </p>

          {/* Main CTA */}
          <motion.a
            href="http://pf.kakao.com/_xecRAG"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-900 text-lg font-bold rounded-2xl shadow-xl hover:bg-slate-100 transition-all duration-200"
          >
            수강 신청 상담하기
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* Contact Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {channels.map((ch, i) => {
            const isModal = ch.href === '#modal'
            const isEmail = ch.href.startsWith('mailto:')
            return (
              <motion.a
                key={ch.title}
                href={isModal ? undefined : ch.href}
                target={ch.href.startsWith('http') ? '_blank' : undefined}
                rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="group glass-card rounded-2xl p-6 text-center cursor-pointer block"
                onClick={
                  isModal
                    ? (e) => { e.preventDefault(); setModalOpen(true) }
                    : isEmail
                      ? handleEmailClick
                      : undefined
                }
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ch.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <ch.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{ch.title}</h3>
                <p className="text-slate-400 text-sm mb-3">{ch.desc}</p>
                {ch.href.startsWith('mailto:') && (
                  <p className="text-slate-500 text-xs mb-3 font-mono">{ch.href.replace('mailto:', '')}</p>
                )}
                <span className="inline-flex items-center gap-1 text-sm text-purple-400 font-medium group-hover:gap-2 transition-all">
                  {ch.action}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </motion.a>
            )
          })}
        </div>

        {/* Sticky Mobile CTA */}
        <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
          <a
            href="http://pf.kakao.com/_xecRAG"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold rounded-2xl shadow-2xl shadow-purple-900/50"
          >
            <MessageCircle className="w-5 h-5" />
            카카오톡 상담 신청
          </a>
        </div>
      </div>
    </section>
  )
}
