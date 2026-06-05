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
import WebinarPage from './pages/WebinarPage'

function App() {
  const [isApplyOpen, setIsApplyOpen] = useState(false)
  const [page, setPage] = useState(() => window.location.hash)

  // 해시 변경 감지
  useEffect(() => {
    const onHash = () => setPage(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (page === '#admin') return <AdminPage />
  if (page === '#webinar') return <WebinarPage />

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
