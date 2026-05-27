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
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Curriculum />
        <AITools />
        <Projects />
        <Outcomes />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
