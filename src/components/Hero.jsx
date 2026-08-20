import React from 'react'
import { motion } from 'framer-motion'
import AxonometricStudy from '../animations/AxonometricStudy'
import SignalTrace from '../animations/SignalTrace'
import footerData from '../data/footer.json'

const Hero = () => {
  return (
    <section id="hero" className="relative scroll-mt-24 px-6 pt-24 pb-16 lg:px-16 lg:pt-12 lg:pb-20">
      <div className="lg:hidden mb-12">
        <p className="font-mono text-[11px] uppercase tracking-index text-muted">Portfolio / 04</p>
        <h1 className="mt-3 font-display text-6xl leading-none text-ink">Alan Lin</h1>
        <p className="mt-4 text-sm text-muted">Computer Science · Boston University</p>
        <p className="mt-6 font-display text-2xl italic leading-snug text-ink">
          Constructing ideas into reality, one line at a time.
        </p>
        <p className="mt-3 text-sm text-muted">
          Catch me bouldering or running from time to time.
        </p>
        <div className="mt-6 flex gap-5">
          {footerData.socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="index-link font-mono text-xs uppercase tracking-index text-muted"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      <div className="grid items-start gap-10 lg:grid-cols-5">
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-[11px] uppercase tracking-index text-muted">
            Currently
          </p>
          <h2 className="mt-4 max-w-xl font-display text-4xl md:text-6xl leading-[1.05] text-ink">
            Building software for research, cities, and the next thing I can’t leave alone.
          </h2>
          <div className="mt-8 w-full max-w-md">
            <SignalTrace />
          </div>
        </motion.div>

        <motion.figure
          className="lg:col-span-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div className="border border-line bg-paper">
            <div className="relative h-[280px] border-b border-line lg:h-[420px]">
              <AxonometricStudy />
            </div>
            <figcaption className="flex items-center justify-between px-4 py-3 font-mono text-[11px] uppercase tracking-index text-muted">
              <span>Fig. 01 — Axonometric study</span>
              <span>Plot / Build</span>
            </figcaption>
          </div>
        </motion.figure>
      </div>
    </section>
  )
}

export default Hero
