import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import footerData from '../data/footer.json'
import { ThemeToggle } from '../theme'

const navItems = [
  { id: 'about', label: 'About', number: '01' },
  { id: 'education', label: 'Education', number: '02' },
  { id: 'experience', label: 'Experience', number: '03' },
  { id: 'projects', label: 'Projects', number: '04' },
]

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', ...navItems.map((item) => item.id)]
      const scrollPos = window.scrollY + window.innerHeight / 3

      sections.forEach((id) => {
        const section = document.getElementById(id)
        if (!section) return
        const top = section.offsetTop
        const bottom = top + section.offsetHeight
        if (scrollPos >= top && scrollPos < bottom) {
          setActiveSection(id)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-line bg-paper/90 px-5 py-4 backdrop-blur-sm lg:hidden">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display text-2xl text-ink"
        >
          Alan Lin
        </button>
        <div className="flex items-center gap-5">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="font-mono text-[11px] uppercase tracking-index text-ink"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? 'Close' : 'Index'}
          </button>
        </div>
      </header>

      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-40 w-[28rem] flex-col justify-between overflow-y-auto border-r border-line bg-paper/80 px-10 py-12 backdrop-blur-[2px]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-index text-muted">
            Portfolio
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-6 text-left"
          >
            <h1 className="font-display text-6xl leading-none text-ink">Alan Lin</h1>
          </button>
          <p className="mt-4 text-sm text-muted">
            B.A. Computer Science · Boston University
          </p>
          <p className="mt-6 max-w-xs font-display text-2xl italic leading-snug text-ink">
            Constructing ideas into reality, one line at a time.
          </p>
          <p className="mt-4 max-w-xs text-sm text-muted">
            Catch me bouldering or running from time to time.
          </p>

          <nav className="mt-14">
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`group flex w-full items-baseline justify-between text-left ${
                      activeSection === item.id ? 'text-accent' : 'text-ink'
                    }`}
                  >
                    <span className={`index-link text-lg ${activeSection === item.id ? 'is-active' : ''}`}>
                      {item.label}
                    </span>
                    <span className="font-mono text-xs text-muted">{item.number}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div>
          <a
            href={footerData.resume.url}
            target="_blank"
            rel="noopener noreferrer"
            className="index-link font-mono text-xs uppercase tracking-index text-ink"
          >
            {footerData.resume.name}
          </a>
          <ul className="mt-4 space-y-2">
            {footerData.socialLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="index-link font-mono text-xs uppercase tracking-index text-muted hover:text-accent"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center justify-between gap-4">
            <p className="font-mono text-[10px] uppercase tracking-index text-line">
              v4
            </p>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-paper pt-20 px-6 lg:hidden"
          >
            <ul className="space-y-6">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="flex w-full items-baseline justify-between border-b border-line pb-4"
                  >
                    <span className="font-display text-4xl">{item.label}</span>
                    <span className="font-mono text-sm text-muted">{item.number}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
            <a
              href={footerData.resume.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 block font-mono text-xs uppercase tracking-index text-ink"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {footerData.resume.name} →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
