import { useState, useEffect, useCallback } from 'react'
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import type { User } from 'firebase/auth'
import {
  auth,
  db,
  ref,
  onValue,
  off,
  updateEnrollment,
} from '../lib/firebase'
import type { Enrollment, ConsultStatus, PaymentStatus } from '../lib/firebase'
import {
  LogOut,
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  MessageSquare,
  Download,
  Search,
  X,
  Save,
  ChevronDown,
  Zap,
} from 'lucide-react'

// ── 상수 ───────────────────────────────────────────────────────────────────────
const CONSULT_LABELS: Record<ConsultStatus, string> = {
  new: '신규',
  contacted: '1차 연락',
  consulting: '상담 진행',
  confirmed: '등록 확정',
  cancelled: '취소',
}

const CONSULT_COLORS: Record<ConsultStatus, string> = {
  new: 'bg-blue-100 text-blue-300 border-blue-200',
  contacted: 'bg-blue-600/20 text-yellow-300 border-blue-200',
  consulting: 'bg-blue-100 text-blue-600 border-blue-200',
  confirmed: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  cancelled: 'bg-red-500/20 text-red-300 border-red-500/30',
}

const PAYMENT_LABELS: Record<PaymentStatus, string> = {
  waiting: '입금대기',
  partial: '부분입금',
  paid: '결제완료',
  refund: '환불',
}

const PAYMENT_COLORS: Record<PaymentStatus, string> = {
  waiting: 'text-slate-600',
  partial: 'text-yellow-400',
  paid: 'text-emerald-400',
  refund: 'text-red-500',
}

function fmtDate(ts: number) {
  const d = new Date(ts)
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

function fmtMoney(n: number) {
  return n.toLocaleString('ko-KR') + '원'
}

// ── 로그인 화면 ────────────────────────────────────────────────────────────────
function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFBFC] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#2563EB] flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-slate-900 font-bold text-xl">AI마케팅 <span className="text-slate-600 text-sm font-normal">관리자</span></span>
        </div>

        <div className="glass rounded-2xl border border-blue-200 p-8">
          <h2 className="text-slate-900 font-bold text-lg mb-6 text-center">관리자 로그인</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-slate-600 text-xs mb-1.5">이메일</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full bg-slate-50 border border-gray-300 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-slate-600 text-xs mb-1.5">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-gray-300 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#0F172A] to-[#2563EB] text-white font-semibold rounded-xl hover:from-[#1E293B] hover:to-[#1D4ED8] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

// ── 신청자 상세 모달 ────────────────────────────────────────────────────────────
function DetailModal({ item, onClose }: { item: Enrollment; onClose: () => void }) {
  const [consultStatus, setConsultStatus] = useState<ConsultStatus>(item.consultStatus)
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(item.paymentStatus)
  const [paymentAmount, setPaymentAmount] = useState(String(item.paymentAmount || ''))
  const [memo, setMemo] = useState(item.memo || '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateEnrollment(item.id, {
        consultStatus,
        paymentStatus,
        paymentAmount: Number(paymentAmount) || 0,
        memo,
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg bg-[#0f172a] border border-blue-200 rounded-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h3 className="text-slate-900 font-bold">{item.name}</h3>
            <p className="text-slate-500 text-xs mt-0.5">{item.email} · {item.phone}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-100 flex items-center justify-center text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
          {/* 기본 정보 */}
          <div className="rounded-xl bg-white border border-gray-200 p-4 space-y-2 text-sm">
            <p className="text-blue-600 text-xs font-semibold tracking-widest uppercase mb-2">기본 정보</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                ['소속', item.affiliation || '-'],
                ['AI 수준', item.aiLevel],
                ['신청일', fmtDate(item.createdAt)],
              ].map(([k, v]) => (
                <div key={k}>
                  <span className="text-slate-500 text-xs">{k}</span>
                  <p className="text-slate-900 text-sm mt-0.5">{v}</p>
                </div>
              ))}
            </div>
            {item.goal && (
              <div className="pt-2 border-t border-gray-200">
                <span className="text-slate-500 text-xs">수강 목표</span>
                <p className="text-slate-700 text-sm mt-0.5 leading-relaxed">{item.goal}</p>
              </div>
            )}
          </div>

          {/* 상담 상태 */}
          <div>
            <label className="block text-slate-600 text-xs font-medium mb-1.5">상담 상태</label>
            <div className="relative">
              <select
                value={consultStatus}
                onChange={e => setConsultStatus(e.target.value as ConsultStatus)}
                className="w-full bg-slate-50 border border-gray-300 text-slate-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all appearance-none pr-10"
                style={{ colorScheme: 'dark' }}
              >
                {(Object.entries(CONSULT_LABELS) as [ConsultStatus, string][]).map(([v, l]) => (
                  <option key={v} value={v} className="bg-white">{l}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 pointer-events-none" />
            </div>
          </div>

          {/* 결제 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 text-xs font-medium mb-1.5">결제 상태</label>
              <div className="relative">
                <select
                  value={paymentStatus}
                  onChange={e => setPaymentStatus(e.target.value as PaymentStatus)}
                  className="w-full bg-slate-50 border border-gray-300 text-slate-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all appearance-none pr-8"
                  style={{ colorScheme: 'dark' }}
                >
                  {(Object.entries(PAYMENT_LABELS) as [PaymentStatus, string][]).map(([v, l]) => (
                    <option key={v} value={v} className="bg-white">{l}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-slate-600 text-xs font-medium mb-1.5">결제 금액 (원)</label>
              <input
                type="number"
                value={paymentAmount}
                onChange={e => setPaymentAmount(e.target.value)}
                placeholder="150000"
                className="w-full bg-slate-50 border border-gray-300 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* 상담 메모 */}
          <div>
            <label className="block text-slate-600 text-xs font-medium mb-1.5">상담 메모</label>
            <textarea
              value={memo}
              onChange={e => setMemo(e.target.value)}
              placeholder="상담 내용, 특이사항 등을 기록하세요."
              rows={4}
              className="w-full bg-slate-50 border border-gray-300 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all resize-none"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#0F172A] to-[#2563EB] text-white font-semibold rounded-xl hover:from-[#1E293B] hover:to-[#1D4ED8] transition-all disabled:opacity-60"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : saved ? (
              '✓ 저장됨'
            ) : (
              <><Save className="w-4 h-4" /> 저장</>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── 대시보드 ───────────────────────────────────────────────────────────────────
const FILTER_TABS = [
  { key: 'all', label: '전체' },
  { key: 'new', label: '신규' },
  { key: 'contacted', label: '1차 연락' },
  { key: 'consulting', label: '상담중' },
  { key: 'confirmed', label: '등록완료' },
  { key: 'cancelled', label: '취소/보류' },
]

function Dashboard({ user }: { user: User }) {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Enrollment | null>(null)
  const [loading, setLoading] = useState(true)

  // 실시간 데이터 구독
  useEffect(() => {
    const dbRef = ref(db, 'enrollments')
    const unsub = onValue(dbRef, snapshot => {
      const raw = snapshot.val() as Record<string, Omit<Enrollment, 'id'>> | null
      if (!raw) { setEnrollments([]); setLoading(false); return }
      const list: Enrollment[] = Object.entries(raw).map(([id, v]) => ({ id, ...v }))
      list.sort((a, b) => b.createdAt - a.createdAt)
      setEnrollments(list)
      setLoading(false)
    })
    return () => off(dbRef, 'value', unsub)
  }, [])

  // 필터링
  const filtered = enrollments.filter(e => {
    const matchFilter =
      filter === 'all' ||
      (filter === 'cancelled' ? e.consultStatus === 'cancelled' : e.consultStatus === filter)
    const matchSearch =
      !search ||
      e.name.includes(search) ||
      e.phone.includes(search) ||
      e.email.includes(search)
    return matchFilter && matchSearch
  })

  // KPI 계산
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const kpi = {
    total: enrollments.length,
    todayNew: enrollments.filter(e => e.createdAt >= today.getTime()).length,
    consulting: enrollments.filter(e => e.consultStatus === 'consulting').length,
    paid: enrollments.filter(e => e.paymentStatus === 'paid').length,
    revenue: enrollments.filter(e => e.paymentStatus === 'paid').reduce((s, e) => s + (e.paymentAmount || 0), 0),
  }

  // CSV 다운로드
  const handleCsvDownload = useCallback(() => {
    const header = ['이름', '연락처', '이메일', '소속', 'AI수준', '상담상태', '결제상태', '결제금액', '신청일', '메모']
    const rows = enrollments.map(e => [
      e.name, e.phone, e.email, e.affiliation || '', e.aiLevel,
      CONSULT_LABELS[e.consultStatus], PAYMENT_LABELS[e.paymentStatus],
      String(e.paymentAmount || 0), new Date(e.createdAt).toLocaleString('ko-KR'),
      (e.memo || '').replace(/\n/g, ' '),
    ])
    const csv = '﻿' + [header, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `수강신청자_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }, [enrollments])

  return (
    <div className="min-h-screen bg-[#FAFBFC] text-slate-900">
      {/* Navbar */}
      <div className="glass border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0F172A] to-[#2563EB] flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-slate-900">AI마케팅</span>
            <span className="text-slate-500 text-sm ml-1">관리자 대시보드</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-600 text-xs hidden sm:block">{user.email}</span>
            <button
              onClick={() => signOut(auth)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              로그아웃
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI 카드 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {[
            { icon: Users, label: '총 신청자', value: `${kpi.total}명`, color: 'text-blue-600' },
            { icon: Calendar, label: '오늘 신규', value: `${kpi.todayNew}명`, color: 'text-blue-400' },
            { icon: MessageSquare, label: '상담 진행중', value: `${kpi.consulting}명`, color: 'text-blue-600' },
            { icon: TrendingUp, label: '결제 완료', value: `${kpi.paid}명`, color: 'text-emerald-400' },
            { icon: DollarSign, label: '총 매출', value: fmtMoney(kpi.revenue), color: 'text-blue-600' },
          ].map(card => (
            <div key={card.label} className="glass-card rounded-2xl p-4">
              <card.icon className={`w-4 h-4 ${card.color} mb-2`} />
              <div className="text-lg font-bold text-slate-900">{card.value}</div>
              <div className="text-slate-500 text-xs mt-0.5">{card.label}</div>
            </div>
          ))}
        </div>

        {/* 필터 + 검색 + CSV */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {/* 필터 탭 */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 flex-1">
            {FILTER_TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setFilter(t.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  filter === t.key
                    ? 'bg-blue-600/40 text-blue-600 border border-blue-300'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                }`}
              >
                {t.label}
                {t.key === 'all' && <span className="ml-1.5 text-slate-500">{enrollments.length}</span>}
                {t.key !== 'all' && t.key !== 'cancelled' && (
                  <span className="ml-1.5 text-slate-500">
                    {enrollments.filter(e => e.consultStatus === t.key).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* 검색 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="이름 / 연락처 / 이메일 검색"
              className="pl-8 pr-4 py-2 bg-slate-50 border border-gray-300 text-slate-900 placeholder-slate-400 rounded-xl text-xs focus:outline-none focus:border-blue-500 transition-all w-52"
            />
          </div>

          {/* CSV */}
          <button
            onClick={handleCsvDownload}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-slate-50 border border-gray-300 text-slate-700 hover:text-slate-900 hover:border-slate-500 rounded-xl transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            CSV 다운로드
          </button>
        </div>

        {/* 테이블 */}
        <div className="glass rounded-2xl border border-blue-100 overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-slate-500 text-sm">데이터 로딩 중...</div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-slate-500 text-sm">신청자가 없습니다.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    {['이름', '연락처', '이메일', '소속', 'AI 수준', '상담 상태', '결제', '금액', '신청일'].map(h => (
                      <th key={h} className="text-left text-slate-500 text-xs font-medium px-4 py-3 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(e => (
                    <tr
                      key={e.id}
                      onClick={() => setSelected(e)}
                      className="border-b border-white/3 hover:bg-white cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3 text-slate-900 font-medium whitespace-nowrap">{e.name}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{e.phone}</td>
                      <td className="px-4 py-3 text-slate-600 max-w-[180px] truncate">{e.email}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{e.affiliation || '-'}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap text-xs">{e.aiLevel.split(' ')[0]}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${CONSULT_COLORS[e.consultStatus]}`}>
                          {CONSULT_LABELS[e.consultStatus]}
                        </span>
                      </td>
                      <td className={`px-4 py-3 text-xs whitespace-nowrap ${PAYMENT_COLORS[e.paymentStatus]}`}>
                        {PAYMENT_LABELS[e.paymentStatus]}
                      </td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap text-xs">
                        {e.paymentAmount ? fmtMoney(e.paymentAmount) : '-'}
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{fmtDate(e.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <p className="text-slate-500 text-xs mt-3 text-right">
          {filtered.length}명 표시 중 (전체 {enrollments.length}명)
        </p>
      </div>

      {/* 상세 모달 */}
      {selected && (
        <DetailModal
          key={selected.id}
          item={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}

// ── 진입점 ─────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u)
      setAuthLoading(false)
    })
    return unsub
  }, [])

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FAFBFC] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
    )
  }

  return user ? <Dashboard user={user} /> : <LoginScreen />
}
