import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'

const navLinks = [
  { label: '소개', href: '#about' },
  { label: '커리큘럼', href: '#curriculum' },
  { label: 'AI 툴', href: '#tools' },
  { label: '프로젝트', href: '#projects' },
  { label: '후기', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
]

interface NavbarProps {
  onApply: () => void
}

export default function Navbar({ onApply }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-blue-500/10 shadow-lg shadow-blue-500/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center animate-pulse-glow">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg" style={{ fontFamily: 'Playfair Display, Noto Serif KR, serif' }}>
              AI<span className="gradient-text">마케팅</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onApply}
              className="px-5 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 hover:scale-105 transition-all duration-200 shadow-lg shadow-blue-500/30"
            >
              수강신청
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-gray-900"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-blue-500/10"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setMenuOpen(false); onApply() }}
                className="mt-2 px-5 py-3 text-center font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white w-full"
              >
                수강신청
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
