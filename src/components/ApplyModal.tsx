import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle2, ChevronDown } from 'lucide-react'
import { saveEnrollment } from '../lib/firebase'

interface ApplyModalProps {
  isOpen: boolean
  onClose: () => void
}

const aiLevels = [
  '전혀 사용해 본 적 없음 (처음 배움)',
  'ChatGPT 등을 가끔 검색용으로 사용해 봄',
  '블로그 글쓰기나 카피 작성 등 일부 업무에 활용 중',
  '마케팅 에이전트나 자동화 툴을 적극적으로 활용 중',
]

export default function ApplyModal({ isOpen, onClose }: ApplyModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    affiliation: '',
    aiLevel: '',
    goal: '',
    privacy: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = '성함을 입력해주세요.'
    if (!form.phone.trim()) e.phone = '연락처를 입력해주세요.'
    if (!form.email.trim()) e.email = '이메일을 입력해주세요.'
    if (!form.aiLevel) e.aiLevel = 'AI 활용 수준을 선택해주세요.'
    if (!form.privacy) e.privacy = '개인정보 수집 및 이용에 동의해주세요.'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setLoading(true)

    try {
      // 1) Firebase Realtime Database 저장 (CRM 관리)
      await saveEnrollment({
        name: form.name,
        phone: form.phone,
        email: form.email,
        affiliation: form.affiliation,
        aiLevel: form.aiLevel,
        goal: form.goal,
      })

      // 2) 이메일은 Firebase Cloud Function이 자동으로 발송
      //    (신청자 확인 메일 + 관리자 알림 동시 처리)

      // 3) 관리자 알림 이메일 백업 (formsubmit)
      fetch('https://formsubmit.co/ajax/psh0135@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: '[수강신청] AI 활용 디지털 마케팅 마스터 과정',
          성함: form.name,
          연락처: form.phone,
          이메일: form.email,
          소속및직함: form.affiliation || '미입력',
          AI활용수준: form.aiLevel,
          수강목표: form.goal || '미입력',
          _template: 'table',
        }),
      }).catch(() => {})

      setSubmitted(true)
    } catch {
      alert('제출 중 오류가 발생했습니다. 이메일로 직접 문의해주세요.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => { setSubmitted(false); setForm({ name:'', phone:'', email:'', affiliation:'', aiLevel:'', goal:'', privacy:false }) }, 400)
  }

  const field = (key: keyof typeof form, label: string, placeholder: string, required = false) => (
    <div>
      <label className="block text-stone-200 text-sm font-medium mb-1.5">
        {label} {required && <span className="text-blue-400">*</span>}
      </label>
      <input
        type="text"
        value={form[key] as string}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className="w-full bg-[#1A1A1A] border border-neutral-700 text-white placeholder-stone-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all"
      />
      {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
    </div>
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[101] max-w-xl mx-auto"
            style={{ maxHeight: '90vh' }}
          >
            <div className="glass rounded-2xl border border-blue-500/25 overflow-hidden flex flex-col" style={{ maxHeight: '90vh' }}>
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0">
                <div>
                  <h2 className="text-white font-bold text-lg">수강 신청</h2>
                  <p className="text-stone-400 text-xs mt-0.5">AI 활용 디지털 마케팅 마스터 과정</p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/10 flex items-center justify-center text-stone-300 hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="overflow-y-auto flex-1 px-6 py-5">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-white font-bold text-xl mb-2">신청이 완료됐습니다!</h3>
                    <p className="text-stone-300 text-sm leading-relaxed mb-6">
                      수강 신청이 정상적으로 접수되었습니다.<br />
                      빠른 시간 내에 연락드리겠습니다.
                    </p>
                    <button
                      onClick={handleClose}
                      className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] text-white font-semibold rounded-xl text-sm"
                    >
                      닫기
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* 수강 정보 */}
                    <div className="rounded-xl bg-blue-600/20 border border-blue-500/25 px-4 py-3 space-y-2.5">
                      <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-2">수강 정보</p>
                      <div className="flex items-center justify-between">
                        <span className="text-stone-300 text-sm">수강과목</span>
                        <span className="text-white text-sm font-medium">AI 활용 디지털 콘텐츠 마케팅</span>
                      </div>
                      <div className="h-px bg-white/10" />
                      <div className="flex items-center justify-between">
                        <span className="text-stone-300 text-sm">수강금액</span>
                        <span className="gradient-text text-sm font-bold">70만원</span>
                      </div>
                      <div className="flex items-center justify-end">
                        <span className="text-emerald-400 text-xs font-medium">국민내일배움카드 결제시 70% 할인</span>
                      </div>
                    </div>

                    {/* 기본 정보 */}
                    <div className="pb-1">
                      <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-3">기본 정보</p>
                      <div className="space-y-3">
                        {field('name', '성함', '홍길동', true)}
                        {field('phone', '연락처', '010-0000-0000', true)}
                        {field('email', '이메일 주소', 'example@email.com', true)}
                        {field('affiliation', '소속 및 직함', '예: ○○회사 / 마케팅팀 팀장')}
                      </div>
                    </div>

                    {/* 사전 설문 */}
                    <div className="pt-2 border-t border-white/10">
                      <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-3">사전 설문</p>

                      {/* AI 활용 수준 */}
                      <div className="mb-3">
                        <label className="block text-stone-200 text-sm font-medium mb-1.5">
                          현재 AI 활용 수준 <span className="text-blue-400">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={form.aiLevel}
                            onChange={e => setForm(f => ({ ...f, aiLevel: e.target.value }))}
                            className="w-full bg-[#1A1A1A] border border-neutral-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all appearance-none pr-10"
                            style={{ colorScheme: 'dark' }}
                          >
                            <option value="" className="bg-[#1A1A1A] text-stone-300">선택해주세요</option>
                            {aiLevels.map(lv => (
                              <option key={lv} value={lv} className="bg-[#1A1A1A] text-white">{lv}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 pointer-events-none" />
                        </div>
                        {errors.aiLevel && <p className="text-red-500 text-xs mt-1">{errors.aiLevel}</p>}
                      </div>

                      {/* 수강 목표 */}
                      <div>
                        <label className="block text-stone-200 text-sm font-medium mb-1.5">
                          수강을 통해 해결하고 싶은 마케팅 고민
                        </label>
                        <textarea
                          value={form.goal}
                          onChange={e => setForm(f => ({ ...f, goal: e.target.value }))}
                          placeholder="예: SNS 콘텐츠 제작 자동화, AI로 광고 성과 개선 등 자유롭게 작성해주세요."
                          rows={3}
                          className="w-full bg-[#1A1A1A] border border-neutral-700 text-white placeholder-stone-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all resize-none"
                        />
                      </div>
                    </div>

                    {/* 개인정보 동의 */}
                    <div className="pt-2 border-t border-white/10">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div
                          onClick={() => setForm(f => ({ ...f, privacy: !f.privacy }))}
                          className={`w-5 h-5 mt-0.5 rounded-md border flex-shrink-0 flex items-center justify-center transition-all ${
                            form.privacy ? 'bg-blue-600 border-blue-600' : 'bg-transparent border-neutral-700 group-hover:border-blue-600'
                          }`}
                        >
                          {form.privacy && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <span className="text-stone-300 text-xs leading-relaxed">
                          수강 신청 및 강의 안내를 위해 입력하신 개인정보(성함, 연락처, 이메일)를 수집·이용하는 것에 동의합니다.
                          개인정보는 강의 운영 목적으로만 사용되며, 제3자에게 제공되지 않습니다.{' '}
                          <span className="text-blue-400">*</span>
                        </span>
                      </label>
                      {errors.privacy && <p className="text-red-500 text-xs mt-1 ml-8">{errors.privacy}</p>}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] text-white font-bold rounded-xl hover:from-[#1D4ED8] hover:to-[#3B82F6] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          전송 중...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          수강 신청하기
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
