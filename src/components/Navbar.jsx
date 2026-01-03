import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'about', label: 'About', number: '01' },
    { id: 'education', label: 'Education', number: '02' },
    { id: 'experience', label: 'Experience', number: '03' },
    { id: 'projects', label: 'Projects', number: '04' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Determine active section
      const sections = navItems.map(item => document.getElementById(item.id))
      const scrollPos = window.scrollY + window.innerHeight / 3

      sections.forEach((section, index) => {
        if (section) {
          const top = section.offsetTop
          const bottom = top + section.offsetHeight
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(navItems[index].id)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
                   ${isScrolled ? 'glass py-4' : 'py-6'}`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="w-8 h-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/favicon.svg" alt="Logo" className="w-full h-full" />
          </motion.a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`group flex items-center gap-1 text-sm transition-colors
                             ${activeSection === item.id 
                               ? 'text-accent' 
                               : 'text-slate-400 hover:text-accent'
                             }`}
                >
                  <span className="font-mono text-accent text-xs">{item.number}.</span>
                  <span className="link-underline">{item.label}</span>
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                aria-disabled="true"
                disabled
                title="Resume not linked"
                className="relative px-4 py-2 rounded-md border border-dashed border-slate-600/50 text-slate-500 text-sm font-medium pointer-events-none cursor-default bg-transparent opacity-60"
              >
                Resume
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-slate-600/50" aria-hidden="true" />
              </button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-300"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div 
              className="absolute inset-0 bg-primary/80 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-3/4 max-w-sm glass p-8 pt-24">
              <ul className="space-y-6">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="flex flex-col text-left"
                    >
                      <span className="font-mono text-accent text-xs mb-1">
                        {item.number}.
                      </span>
                      <span className="text-lg text-slate-200 hover:text-accent transition-colors">
                        {item.label}
                      </span>
                    </button>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <button
                    type="button"
                    aria-disabled="true"
                    disabled
                    title="Resume not linked"
                    className="relative inline-block px-6 py-3 rounded-md border border-dashed border-slate-600/50 text-slate-500 
                              font-medium pointer-events-none cursor-default bg-transparent opacity-60"
                  >
                    Resume
                    <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 rounded-full bg-slate-600/50" aria-hidden="true" />
                  </button>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
