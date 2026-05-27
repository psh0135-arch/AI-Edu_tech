import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star } from 'lucide-react'

const reviews = [
  {
    name: '김지원',
    role: '마케팅 팀장',
    avatar: '👩‍💼',
    rating: 5,
    text: '실무에 바로 활용 가능한 AI 활용법을 배웠습니다. ChatGPT로 콘텐츠 제작 시간을 70% 단축했어요.',
  },
  {
    name: '박민준',
    role: '프리랜서 디자이너',
    avatar: '👨‍🎨',
    rating: 5,
    text: 'AI 이미지 생성과 Canva AI 결합으로 클라이언트 납품 속도가 3배 빨라졌습니다. 투자한 시간 대비 최고의 강의!',
  },
  {
    name: '이수현',
    role: '스타트업 대표',
    avatar: '🧑‍💻',
    rating: 5,
    text: 'Make 자동화로 우리 회사 마케팅 운영 비용을 절반으로 줄였습니다. 바이브코딩 세션에서 랜딩 페이지까지 직접 만들었어요.',
  },
  {
    name: '최유나',
    role: '취업 준비생 → AI 마케터',
    avatar: '👩‍💻',
    rating: 5,
    text: '비전공자였지만 수료 후 AI 마케터로 취업 성공했습니다. 포트폴리오 프로젝트가 면접에서 큰 강점이 됐어요.',
  },
  {
    name: '정다혜',
    role: '콘텐츠 크리에이터',
    avatar: '🎬',
    rating: 5,
    text: 'Runway와 CapCut AI 조합으로 유튜브 쇼츠 제작 시간이 1/4로 줄었습니다. 구독자도 2배 성장했어요!',
  },
  {
    name: '강현우',
    role: '기업 교육 담당자',
    avatar: '👨‍🏫',
    rating: 5,
    text: '사내 AI 도입 교육으로 활용했는데 직원들 반응이 정말 좋았습니다. 실습 중심이라 바로 적용이 가능했어요.',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-64 bg-purple-900/15 rounded-full blur-[100px]" />
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
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            수강생 실제 후기
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            강의를 수료하고 실제 변화를 경험한 수강생들의 이야기
          </p>
        </motion.div>

        {/* Infinite Marquee */}
        <div className="overflow-hidden mb-8">
          <div className="flex gap-4 animate-marquee">
            {[...reviews, ...reviews].map((review, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-80 glass-card rounded-2xl p-5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center text-lg">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{review.name}</div>
                    <div className="text-slate-500 text-xs">{review.role}</div>
                  </div>
                </div>
                <Stars count={review.rating} />
                <p className="text-slate-400 text-sm leading-relaxed mt-3">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Second row reversed */}
        <div className="overflow-hidden">
          <div className="flex gap-4" style={{ animation: 'marquee 35s linear infinite reverse' }}>
            {[...reviews.slice(3), ...reviews.slice(3)].map((review, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-80 glass-card rounded-2xl p-5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-600 to-purple-600 flex items-center justify-center text-lg">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{review.name}</div>
                    <div className="text-slate-500 text-xs">{review.role}</div>
                  </div>
                </div>
                <Stars count={review.rating} />
                <p className="text-slate-400 text-sm leading-relaxed mt-3">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
