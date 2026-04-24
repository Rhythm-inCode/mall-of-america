import { useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Intro from './pages/Intro'
import Overview from './pages/Overview'
import Retail from './pages/Retail'
import Luxury from './pages/Luxury'
import Dining from './pages/Dining'
import Entertainment from './pages/Entertainment'
import Events from './pages/Events'
import Leasing from './pages/Leasing'
import Sponsorship from './pages/Sponsorship'
import Contact from './pages/Contact'

const pageTitles = {
  '/': "Mall of America — America's Greatest Stage",
  '/overview': 'Why MoA — Mall of America',
  '/retail': 'Retail Environment — Mall of America',
  '/luxury': 'The Luxury Wing — Mall of America',
  '/dining': 'Dining & Lifestyle — Mall of America',
  '/entertainment': 'Nickelodeon Universe — Mall of America',
  '/events': 'Events & Platform — Mall of America',
  '/leasing': 'Leasing — Mall of America',
  '/sponsorship': 'Sponsorship — Mall of America',
  '/contact': 'Connect — Mall of America',
}

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0, y: -16,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
  },
}

function PageWrapper({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}

function ScrollToTop() {
  const location = useLocation()
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.title = pageTitles[location.pathname] || "Mall of America"
  }, [location.pathname])

  // Refresh pe bhi top pe
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  const isIntro = location.pathname === '/'

  return (
    <>
      <ScrollToTop />
      {!isIntro && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Intro />} />
          <Route path="/overview" element={<PageWrapper><Overview /></PageWrapper>} />
          <Route path="/retail" element={<PageWrapper><Retail /></PageWrapper>} />
          <Route path="/luxury" element={<PageWrapper><Luxury /></PageWrapper>} />
          <Route path="/dining" element={<PageWrapper><Dining /></PageWrapper>} />
          <Route path="/entertainment" element={<PageWrapper><Entertainment /></PageWrapper>} />
          <Route path="/events" element={<PageWrapper><Events /></PageWrapper>} />
          <Route path="/leasing" element={<PageWrapper><Leasing /></PageWrapper>} />
          <Route path="/sponsorship" element={<PageWrapper><Sponsorship /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AnimatedRoutes />
    </HashRouter>
  )
}