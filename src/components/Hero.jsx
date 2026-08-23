import React from 'react'
import footerData from '../data/footer.json'

const Hero = () => {
  return (
    <section id="hero" className="scroll-mt-24 px-6 pt-24 pb-8 lg:hidden">
      <p className="font-mono text-[11px] uppercase tracking-index text-muted">Portfolio / 04</p>
      <h1 className="mt-3 font-display text-6xl leading-none text-ink">Alan Lin</h1>
      <p className="mt-4 text-sm text-muted">B.A. Computer Science · Boston University</p>
      <p className="mt-6 font-display text-2xl italic leading-snug text-ink">
        Constructing ideas into reality, one line at a time.
      </p>
      <p className="mt-3 text-sm text-muted">
        Catch me bouldering or running from time to time.
      </p>
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
        <a
          href={footerData.resume.url}
          target="_blank"
          rel="noopener noreferrer"
          className="index-link font-mono text-xs uppercase tracking-index text-ink"
        >
          {footerData.resume.name}
        </a>
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
    </section>
  )
}

export default Hero
