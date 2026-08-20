import React from 'react'

const SectionHeader = ({ number, title, kicker }) => (
  <header className="mb-12">
    <div className="flex items-baseline justify-between gap-6 border-b border-line pb-3">
      <div>
        {kicker && (
          <p className="mb-1 font-mono text-[11px] uppercase tracking-index text-muted">
            {kicker}
          </p>
        )}
        <h2 className="font-display text-4xl md:text-5xl text-ink">{title}</h2>
      </div>
      <span className="font-mono text-sm text-accent tabular-nums">{number}</span>
    </div>
  </header>
)

export default SectionHeader
