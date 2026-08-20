import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import RunningStickman from '../animations/RunningStickman'
import SectionHeader from './SectionHeader'
import experienceData from '../data/experiences.json'

const Experience = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  const experiences = experienceData.experiences

  return (
    <section id="experience" className="scroll-mt-24 px-6 py-24 lg:px-16">
      <motion.div
        ref={ref}
        className="max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeader number="03" title="Experience" kicker="Work" />

        <div>
          {experiences.map((exp, index) => (
            <article
              key={`${exp.title}-${exp.date}-${index}`}
              className="grid gap-4 border-t border-line py-8 sm:grid-cols-[9rem_1fr] sm:gap-8"
            >
              <p className="font-mono text-xs uppercase tracking-wide text-muted pt-1">
                {exp.date}
              </p>

              <div>
                <div className="flex items-start gap-4">
                  {exp.logo && (
                    <img
                      src={exp.logo}
                      alt=""
                      className="h-10 w-10 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  )}
                  <div>
                    <h3 className="font-display text-2xl leading-tight">
                      {exp.title}
                    </h3>
                    <p className="mt-1 text-sm">
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="index-link text-accent"
                      >
                        {exp.company}
                      </a>
                      {exp.current && (
                        <span className="ml-3 font-mono text-[11px] uppercase tracking-index text-muted">
                          Current
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <ul className="mt-4 space-y-3">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="text-sm leading-relaxed text-ink/85">
                      {desc}
                    </li>
                  ))}
                </ul>

                {exp.skills.length > 0 && (
                  <p className="mt-4 font-mono text-xs text-muted">
                    {exp.skills.join('  ·  ')}
                  </p>
                )}
              </div>
            </article>
          ))}
          <div className="border-t border-line" />
        </div>

        <div className="relative mt-12 overflow-hidden border border-line">
          <RunningStickman />
        </div>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-index text-muted">
          Fig. 03 — On a loop
        </p>
      </motion.div>
    </section>
  )
}

export default Experience
