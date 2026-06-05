import { useState, useEffect } from 'react'
import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Curriculum from './components/Curriculum'
import AITools from './components/AITools'
import Projects from './components/Projects'
import Outcomes from './components/Outcomes'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Webinar from './components/Webinar'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ApplyModal from './components/ApplyModal'
import AdminPage from './pages/AdminPage'

function App() {
  const [isApplyOpen, setIsApplyOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(() => window.location.hash === '#admin')

  // 해시 변경 감지 (#admin ↔ 메인)
  useEffect(() => {
    const onHash = () => setIsAdmin(window.location.hash === '#admin')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (isAdmin) return <AdminPage />

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden">
      <Navbar onApply={() => setIsApplyOpen(true)} />
      <main>
        <Hero onApply={() => setIsApplyOpen(true)} />
        <About />
        <Curriculum />
        <AITools />
        <Projects />
        <Outcomes />
        <Testimonials />
        <FAQ />
        <Webinar />
        <Contact />
      </main>
      <Footer />
      <ApplyModal isOpen={isApplyOpen} onClose={() => setIsApplyOpen(false)} />
    </div>
  )
}

export default App
