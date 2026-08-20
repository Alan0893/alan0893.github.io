import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import footerData from '../data/footer.json'

const ScrollButton = () => {
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    if (isAtTop) {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 border border-ink bg-paper px-3 py-2 font-mono text-[11px] uppercase tracking-index text-ink hover:bg-ink hover:text-paper transition-colors"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {isAtTop ? 'End' : 'Top'}
    </motion.button>
  )
}

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="px-6 pb-16 pt-8 lg:px-16">
      <div className="max-w-3xl border-t border-ink pt-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-3xl italic">Alan Lin</p>
            <p className="mt-2 text-sm text-muted">
              Designed & built by{' '}
              <a
                href="https://github.com/Alan0893"
                target="_blank"
                rel="noopener noreferrer"
                className="index-link text-ink"
              >
                Alan Lin
              </a>
            </p>
            <p className="mt-1 text-xs text-muted">
              Built with {footerData.footer.builtWith.join(', ')}
            </p>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-index text-muted">
            © {currentYear} · v4
          </p>
        </div>

        <ul className="mt-8 flex gap-6 lg:hidden">
          {footerData.socialLinks.map((social) => (
            <li key={social.name}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="index-link font-mono text-xs uppercase tracking-index text-muted"
              >
                {social.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <ScrollButton />
    </footer>
  )
}

export default Footer
