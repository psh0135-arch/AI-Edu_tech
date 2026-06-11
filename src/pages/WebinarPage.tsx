import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Calendar, Clock, Users, CheckCircle2, ChevronDown,
  ArrowRight, Zap, Code2, Rocket, Sparkles, Send,
  Play, MonitorSmartphone, Brain, Terminal,
} from 'lucide-react'
import { saveWebinarRegistration, subscribeWebinarCount } from '../lib/firebase'

// ── 상수 ─────────────────────────────────────────────────────────────────────
const WEBINAR_DATE = '2026.07.01(수) 19:00 ~ 21:00'
const WEBINAR_DEADLINE = new Date('2026-07-01T00:00:00+09:00')
const SEED_COUNT = 42  // 심리적 사회적 증거 시드

// ── 커리큘럼 ──────────────────────────────────────────────────────────────────
const curriculum = [
  {
    time: '19:00 – 19:30',
    title: '바이브코딩 마인드셋',
    desc: '"나는 개발자다" — 코드를 쓰지 않고 AI와 대화로 앱을 만드는 패러다임 전환. Claude AI가 어떻게 코드를 생성하고 버그를 고치는지 실제 사례로 소개합니다.',
    icon: Brain,
    tag: '이론',
  },
  {
    time: '19:30 – 20:00',
    title: 'Claude Code + Cursor 실전 셋업',
    desc: '개발 환경 0에서 설치까지 라이브로 진행합니다. 프롬프트 작성법, 명령 패턴, 에러 해결 루틴 등 핵심 워크플로우를 실습합니다.',
    icon: Terminal,
    tag: '실습',
  },
  {
    time: '20:00 – 20:40',
    title: '라이브 시연 — 랜딩페이지 30분 완성',
    desc: '실제로 지금 이 웹사이트처럼 퀄리티 높은 랜딩페이지를 30분 안에 완성하는 전 과정을 눈 앞에서 보여드립니다. 참가자 직접 실습 포함.',
    icon: MonitorSmartphone,
    tag: '라이브 코딩',
  },
  {
    time: '20:40 – 21:00',
    title: 'Q&A + 본 과정 심화 안내',
    desc: '궁금한 점 무엇이든 질문하세요. 바이브코딩을 포함한 AI 마케팅 풀 커리큘럼 안내 및 수강 혜택을 안내드립니다.',
    icon: Sparkles,
    tag: 'Q&A',
  },
]

// ── 혜택 ─────────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: Zap,
    title: '아이디어 → 앱, 24시간 안에',
    desc: '기획서만 있으면 됩니다. Claude AI에게 설명하면 실제 작동하는 웹앱 코드를 만들어 줍니다.',
  },
  {
    icon: Code2,
    title: '코딩 지식 0 → 개발자 수준 결과물',
    desc: 'Cursor + Claude Code 조합으로 마케터·기획자도 개발팀 없이 직접 서비스를 배포할 수 있습니다.',
  },
  {
    icon: Rocket,
    title: '실무 즉시 투입 워크플로우',
    desc: '랜딩페이지, 신청폼, 대시보드 — 실제 업무에서 바로 쓰는 결과물을 만드는 방법을 배웁니다.',
  },
]

// ── FAQ ───────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: '코딩 경험이 전혀 없어도 참여할 수 있나요?',
    a: '네, 완전히 가능합니다. 바이브코딩은 코드를 직접 작성하지 않고 AI와 대화로 개발하는 방식입니다. 오히려 기존 코딩 관습이 없는 분이 더 빠르게 익히는 경우가 많습니다.',
  },
  {
    q: '사전 준비물이 있나요?',
    a: '노트북 1대면 충분합니다. 특강 당일 Claude AI 계정과 Cursor 설치를 함께 진행합니다. 미리 준비하고 싶다면 cursor.sh에서 무료로 설치해 오시면 됩니다.',
  },
  {
    q: 'ZOOM 링크는 언제 받을 수 있나요?',
    a: '신청 완료 시 이메일과 문자로 ZOOM 링크가 자동 발송됩니다. 특강 당일 1시간 전에도 리마인드 메시지가 전송됩니다.',
  },
  {
    q: '실시간 참여가 어렵다면 녹화본을 받을 수 있나요?',
    a: '특강 후 72시간 이내로 신청자 전원에게 녹화 영상 링크를 이메일로 발송해드립니다.',
  },
  {
    q: '이 웨비나 이후 본 과정과 어떻게 연결되나요?',
    a: '본 과정 "AI 활용 디지털 콘텐츠 마케팅"에 바이브코딩 모듈이 포함됩니다. 웨비나 참가자에게는 본 과정 수강 시 우선 안내 혜택이 주어집니다.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────

function useCountdown(target: Date) {
  const [diff, setDiff] = useState(target.getTime() - Date.now())
  useEffect(() => {
    const id = setInterval(() => setDiff(target.getTime() - Date.now()), 1000)
    return () => clearInterval(id)
  }, [target])
  const total = Math.max(0, diff)
  const d = Math.floor(total / 86400000)
  const h = Math.floor((total % 86400000) / 3600000)
  const m = Math.floor((total % 3600000) / 60000)
  const s = Math.floor((total % 60000) / 1000)
  return { d, h, m, s }
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-2xl font-bold text-gray-900 tabular-nums">
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-gray-500 text-xs mt-1">{label}</span>
    </div>
  )
}

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${open ? 'border-blue-500/40 bg-blue-50' : 'border-gray-200 bg-white'}`}>
      <button className="w-full flex items-center justify-between px-6 py-4 text-left" onClick={onToggle}>
        <span className="text-gray-900 font-medium pr-4 text-sm md:text-base">{q}</span>
        <ChevronDown className={`w-5 h-5 text-blue-600 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
            <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-200 pt-4">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
export default function WebinarPage() {
  const { d, h, m, s } = useCountdown(WEBINAR_DEADLINE)
  const [count, setCount] = useState(SEED_COUNT)
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const [form, setForm] = useState({ name: '', phone: '', email: '', affiliation: '' })
  const [privacy, setPrivacy] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const heroRef = useRef(null)
  const benefitsRef = useRef(null)
  const curriculumRef = useRef(null)
  const instructorRef = useRef(null)
  const formRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef(null)
  const benefitsInView = useInView(benefitsRef, { once: true, margin: '-80px' })
  const curriculumInView = useInView(curriculumRef, { once: true, margin: '-80px' })
  const instructorInView = useInView(instructorRef, { once: true, margin: '-80px' })
  const faqInView = useInView(faqRef, { once: true, margin: '-80px' })

  // 페이지 진입 시 최상단으로 스크롤
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // 실시간 신청 수
  useEffect(() => {
    const unsub = subscribeWebinarCount((n) => setCount(n + SEED_COUNT))
    return unsub
  }, [])

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = '성함을 입력해주세요.'
    if (!form.phone.trim()) e.phone = '연락처를 입력해주세요.'
    if (!form.email.trim()) e.email = '이메일을 입력해주세요.'
    if (!privacy) e.privacy = '개인정보 수집에 동의해주세요.'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    try {
      await saveWebinarRegistration({
        name: form.name,
        phone: form.phone,
        email: form.email,
        affiliation: form.affiliation,
      })
      // 관리자 백업 알림
      fetch('https://formsubmit.co/ajax/psh0135@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: '[웨비나 신청] 바이브코딩 무료 LIVE 특강',
          성함: form.name, 연락처: form.phone, 이메일: form.email,
          소속: form.affiliation || '미입력', _template: 'table',
        }),
      }).catch(() => {})
      setSubmitted(true)
    } catch {
      alert('제출 중 오류가 발생했습니다. 이메일로 문의해 주세요.')
    } finally {
      setLoading(false)
    }
  }

  // ── 성공 화면 ──────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FAFBFC] flex flex-col items-center justify-center px-4 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="max-w-md">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">신청 완료!</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong className="text-gray-900">{form.name}</strong>님, 웨비나 신청이 접수되었습니다.<br />
            ZOOM 링크는 <strong className="text-blue-600">{form.email}</strong>과<br />
            <strong className="text-blue-600">{form.phone}</strong>으로 발송됩니다.
          </p>
          <div className="glass rounded-2xl border border-blue-500/20 p-5 mb-8 text-sm text-gray-600 text-left space-y-2">
            <p>📅 <strong className="text-gray-900">일시</strong>: {WEBINAR_DATE}</p>
            <p>💻 <strong className="text-gray-900">방식</strong>: ZOOM 실시간 온라인</p>
            <p>📩 <strong className="text-gray-900">확인 메일</strong>: 영업일 기준 24시간 이내 발송</p>
          </div>
          <button
            onClick={() => { window.location.hash = '' }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl text-sm"
          >
            메인 강의 살펴보기
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    )
  }

  // ── 메인 렌더 ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAFBFC] text-gray-900">

      {/* ── 상단 네비 ── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={() => { window.location.hash = '' }} className="text-gray-600 hover:text-gray-900 text-sm transition-colors flex items-center gap-1.5">
            ← 메인으로
          </button>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-red-500 text-xs font-bold uppercase tracking-widest">LIVE</span>
            <span className="text-gray-500 text-xs hidden sm:inline">· 2026.07.01(수) 19:00~21:00</span>
          </div>
          <button onClick={scrollToForm} className="px-4 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90 transition-opacity">
            무료 신청
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative overflow-hidden pt-20 pb-24 px-4">
        {/* BG glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-200/20 rounded-full blur-[140px]" />
          <div className="absolute top-20 right-1/4 w-[300px] h-[300px] bg-blue-200/15 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative">
          {/* Live badge */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold uppercase tracking-widest mb-6">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
            </span>
            무료 LIVE 웨비나 · 2026.07.01
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-6">
            코딩 몰라도
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-400 to-blue-400 bg-clip-text text-transparent">
              AI로 앱 만들기
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8 max-w-xl mx-auto">
            Claude AI + Cursor로 마케터·기획자도<br className="hidden sm:block" />
            24시간 안에 실제 작동하는 서비스를 배포합니다.
          </motion.p>

          {/* 카운트다운 */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-3 mb-8">
            <CountdownUnit value={d} label="일" />
            <span className="text-gray-400 text-2xl font-bold pb-4">:</span>
            <CountdownUnit value={h} label="시간" />
            <span className="text-gray-400 text-2xl font-bold pb-4">:</span>
            <CountdownUnit value={m} label="분" />
            <span className="text-gray-400 text-2xl font-bold pb-4">:</span>
            <CountdownUnit value={s} label="초" />
          </motion.div>

          {/* 신청자 수 */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 mb-8">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-500 border-2 border-white" />
              ))}
            </div>
            <span className="text-gray-600 text-sm">
              현재 <strong className="text-gray-900">{count}명</strong>이 신청했습니다
            </span>
          </motion.div>

          <motion.button onClick={scrollToForm} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-lg font-bold rounded-2xl shadow-2xl shadow-blue-500/50 hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 hover:scale-105">
            무료 웨비나 신청하기
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <p className="text-gray-400 text-xs mt-4">선착순 100명 · 비용 없음 · 언제든 취소 가능</p>
        </div>
      </section>

      {/* ── 혜택 3가지 ── */}
      <section ref={benefitsRef} className="py-20 px-4 border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={benefitsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="text-center mb-12">
            <span className="text-cyan-600 text-xs font-bold uppercase tracking-widest block mb-3">이 웨비나에서 얻어가는 것</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">2시간 후, 당신이 달라집니다</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={benefitsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.12 }}
                className="glass-card rounded-2xl p-6 border border-gray-200 hover:border-blue-500/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/30 to-blue-600/30 border border-blue-500/20 flex items-center justify-center mb-4">
                  <b.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-gray-900 font-bold text-lg mb-2">{b.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 커리큘럼 타임라인 ── */}
      <section ref={curriculumRef} className="py-20 px-4 border-t border-gray-200">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={curriculumInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="text-center mb-12">
            <span className="text-cyan-600 text-xs font-bold uppercase tracking-widest block mb-3">CURRICULUM</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">2시간 타임라인</h2>
            <p className="text-gray-600">처음부터 끝까지 라이브로 함께합니다</p>
          </motion.div>

          <div className="relative">
            {/* 세로선 */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-blue-500/30 to-transparent" />

            <div className="space-y-8">
              {curriculum.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={curriculumInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="flex gap-6 md:gap-8">
                  {/* 아이콘 노드 */}
                  <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-blue-600/40 to-blue-600/20 border border-blue-500/30 flex items-center justify-center relative z-10">
                    <item.icon className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                  </div>
                  {/* 내용 */}
                  <div className="glass-card rounded-2xl p-5 flex-1 border border-gray-200">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-gray-500 text-xs font-mono">{item.time}</span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-600 text-xs font-medium">{item.tag}</span>
                    </div>
                    <h3 className="text-gray-900 font-bold text-base md:text-lg mb-1.5">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 강사 소개 ── */}
      <section ref={instructorRef} className="py-20 px-4 border-t border-gray-200">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={instructorInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl border border-gray-200 p-8 md:p-10">
            <span className="text-cyan-600 text-xs font-bold uppercase tracking-widest block mb-6">INSTRUCTOR</span>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <img
                src={`${import.meta.env.BASE_URL}leader.jpg`}
                alt="강사 박상훈"
                className="w-24 h-24 rounded-2xl object-cover border-2 border-blue-500/30 flex-shrink-0"
              />
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-gray-900 font-bold text-2xl">박상훈</h3>
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-600 text-xs font-medium">AI 마케팅 강사</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  생성형 AI와 바이브코딩을 결합해 마케터·기획자가 직접 디지털 서비스를 만드는 방법을 연구하고 가르칩니다.
                  ChatGPT·Claude AI·Cursor를 활용한 No-Code 개발 워크플로우 전문가로, 비전공자 수백 명에게 AI 도구 실무 활용을 강의했습니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Claude AI', 'Cursor', 'ChatGPT', '바이브코딩', 'AI 마케팅'].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-xs">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 신청 폼 ── */}
      <section className="py-20 px-4 border-t border-gray-200">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-cyan-600 text-xs font-bold uppercase tracking-widest block mb-3">REGISTER</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">지금 무료로 신청하세요</h2>
            <p className="text-gray-600 text-sm">
              <strong className="text-gray-900">{count}명</strong>이 이미 신청했습니다 · 선착순 100명
            </p>
          </div>

          <div ref={formRef} className="glass-card rounded-3xl border border-blue-500/20 p-8">
            {/* 웨비나 정보 요약 */}
            <div className="rounded-xl bg-blue-200/20 border border-blue-500/20 px-4 py-3 mb-6 space-y-2">
              <div className="flex items-center gap-2 text-blue-600 text-xs font-semibold uppercase tracking-wider">
                <Play className="w-3 h-3" /> 웨비나 정보
              </div>
              <div className="flex items-center gap-2 text-gray-700 text-sm">
                <Calendar className="w-4 h-4 text-blue-600" />
                {WEBINAR_DATE}
              </div>
              <div className="flex items-center gap-2 text-gray-700 text-sm">
                <Clock className="w-4 h-4 text-blue-600" />
                ZOOM 실시간 온라인 · 참가비 <span className="text-emerald-400 font-bold ml-1">무료</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 성함 */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">성함 <span className="text-blue-600">*</span></label>
                <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="홍길동"
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/60 transition-all" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              {/* 연락처 */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">연락처 <span className="text-blue-600">*</span></label>
                <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="010-0000-0000"
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/60 transition-all" />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              {/* 이메일 */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">이메일 <span className="text-blue-600">*</span></label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="example@email.com"
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/60 transition-all" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              {/* 소속 */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">소속 및 직함 <span className="text-gray-400 text-xs font-normal">(선택)</span></label>
                <input type="text" value={form.affiliation} onChange={e => setForm(f => ({ ...f, affiliation: e.target.value }))}
                  placeholder="예: ○○회사 / 마케팅팀 팀장"
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/60 transition-all" />
              </div>

              {/* 개인정보 동의 */}
              <div className="pt-2 border-t border-gray-200">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div onClick={() => setPrivacy(p => !p)}
                    className={`w-5 h-5 mt-0.5 rounded-md border flex-shrink-0 flex items-center justify-center transition-all ${privacy ? 'bg-blue-600 border-blue-600' : 'bg-transparent border-gray-300 group-hover:border-blue-600'}`}>
                    {privacy && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className="text-gray-600 text-xs leading-relaxed">
                    웨비나 안내 및 ZOOM 링크 발송을 위해 개인정보(성함·연락처·이메일)를 수집·이용하는 것에 동의합니다. <span className="text-blue-600">*</span>
                  </span>
                </label>
                {errors.privacy && <p className="text-red-500 text-xs mt-1 ml-8">{errors.privacy}</p>}
              </div>

              {/* 제출 버튼 */}
              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed text-base">
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> 신청 중...</>
                ) : (
                  <><Send className="w-4 h-4" /> 무료 웨비나 신청하기</>
                )}
              </button>
              <p className="text-gray-400 text-xs text-center">신청 즉시 이메일 + 문자로 ZOOM 링크를 보내드립니다</p>
            </form>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section ref={faqRef} className="py-20 px-4 border-t border-gray-200">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={faqInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="text-center mb-10">
            <span className="text-cyan-600 text-xs font-bold uppercase tracking-widest block mb-3">FAQ</span>
            <h2 className="text-3xl font-bold text-gray-900">자주 묻는 질문</h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={faqInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.07 }}>
                <FAQItem q={faq.q} a={faq.a} open={faqOpen === i} onToggle={() => setFaqOpen(faqOpen === i ? null : i)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 하단 CTA ── */}
      <section className="py-20 px-4 border-t border-gray-200 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            2시간이 당신의 커리어를<br />바꿀 수 있습니다
          </h2>
          <p className="text-gray-600 mb-8">비용 없음 · ZOOM 실시간 · 당일 녹화본 제공</p>
          <button onClick={scrollToForm}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-lg font-bold rounded-2xl shadow-2xl shadow-blue-500/50 hover:from-blue-700 hover:to-cyan-600 transition-all hover:scale-105">
            지금 무료 신청하기
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-gray-400 text-xs mt-4">
            본 과정 문의: <a href="mailto:psh0135@gmail.com" className="text-gray-500 hover:text-gray-700 underline">psh0135@gmail.com</a>
          </p>
        </div>
      </section>

      {/* ── 모바일 고정 CTA ── */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <button onClick={scrollToForm}
          className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-2xl shadow-2xl shadow-blue-500/50">
          <Users className="w-5 h-5" />
          무료 웨비나 신청 ({count}명 신청 중)
        </button>
      </div>

    </div>
  )
}
