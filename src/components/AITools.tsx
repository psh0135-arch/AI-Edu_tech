import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const tools = [
  { name: 'ChatGPT', category: '텍스트 생성', emoji: '💬', practice: true, color: 'from-green-600/20 to-green-900/20', border: 'border-green-500/30', text: 'text-green-400' },
  { name: 'Claude AI', category: 'AI 어시스턴트', emoji: '🤖', practice: true, color: 'from-orange-600/20 to-orange-900/20', border: 'border-orange-500/30', text: 'text-orange-400' },
  { name: 'Gemini', category: '멀티모달 AI', emoji: '♊', practice: true, color: 'from-blue-600/20 to-blue-900/20', border: 'border-blue-500/30', text: 'text-blue-400' },
  { name: 'Canva AI', category: '디자인 자동화', emoji: '🎨', practice: true, color: 'from-pink-600/20 to-pink-900/20', border: 'border-pink-500/30', text: 'text-pink-400' },
  { name: 'Gamma AI', category: '프레젠테이션', emoji: '📊', practice: true, color: 'from-yellow-600/20 to-yellow-900/20', border: 'border-yellow-500/30', text: 'text-yellow-400' },
  { name: 'Runway', category: 'AI 영상 생성', emoji: '🎬', practice: true, color: 'from-red-600/20 to-red-900/20', border: 'border-red-500/30', text: 'text-red-400' },
  { name: 'CapCut', category: '영상 편집', emoji: '✂️', practice: true, color: 'from-yellow-600/20 to-yellow-900/20', border: 'border-yellow-500/30', text: 'text-yellow-400' },
  { name: 'SUNO', category: 'AI 음악 생성', emoji: '🎵', practice: true, color: 'from-teal-600/20 to-teal-900/20', border: 'border-teal-500/30', text: 'text-teal-400' },
  { name: 'NotebookLM', category: 'AI 리서치', emoji: '📓', practice: false, color: 'from-amber-600/20 to-amber-900/20', border: 'border-amber-500/30', text: 'text-amber-200' },
  { name: 'Make', category: '마케팅 자동화', emoji: '⚙️', practice: true, color: 'from-indigo-600/20 to-indigo-900/20', border: 'border-indigo-500/30', text: 'text-indigo-400' },
  { name: 'Cursor AI', category: '바이브코딩', emoji: '💻', practice: true, color: 'from-slate-600/20 to-slate-900/20', border: 'border-slate-500/30', text: 'text-stone-200' },
]

export default function AITools() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="tools" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-amber-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-600/10 rounded-full blur-[120px]" />
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
            AI Tools
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            ChatGPT·Gemini·Claude 등 AI 툴 실습
          </h2>
          <p className="text-stone-300 text-lg max-w-2xl mx-auto">
            최신 생성형 AI 툴을 직접 실습하며 실무에 즉시 활용 가능한 역량을 키웁니다
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`group relative rounded-2xl p-5 bg-gradient-to-br ${tool.color} border ${tool.border} cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />

              {/* Practice Badge */}
              {tool.practice && (
                <div className="absolute top-3 right-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60 border border-white/10">
                    실습
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className="text-3xl mb-3">{tool.emoji}</div>

              {/* Name */}
              <h3 className="text-white font-bold text-base mb-1">{tool.name}</h3>

              {/* Category */}
              <p className={`text-xs font-medium ${tool.text}`}>{tool.category}</p>

              {/* Gradient Border on Hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none gradient-border" />
            </motion.div>
          ))}
        </div>

        {/* Marquee Bottom */}
        <div className="mt-16 overflow-hidden">
          <div className="flex animate-marquee gap-6 w-max">
            {[...tools, ...tools].map((tool, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 glass border border-amber-500/20 rounded-full text-sm text-stone-300 flex-shrink-0"
              >
                <span>{tool.emoji}</span>
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
