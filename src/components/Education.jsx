import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CourseIndex from '../animations/CourseIndex'
import SectionHeader from './SectionHeader'
import educationData from '../data/education.json'

const Education = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const education = educationData.education

  return (
    <section id="education" className="scroll-mt-24 px-6 py-24 lg:px-16">
      <motion.div
        ref={ref}
        className="max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeader number="02" title="Education" kicker="Study" />

        <div className="space-y-8">
          {education.map((edu) => (
            <article key={edu.school}>
              <div className="flex items-start gap-4 border border-line p-4 sm:gap-5 sm:p-6">
                {edu.logo && (
                  <img src={edu.logo} alt="" className="h-10 w-10 object-contain sm:h-12 sm:w-12" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-2xl leading-tight sm:text-3xl">{edu.school}</h3>
                    {edu.current && (
                      <span className="font-mono text-[11px] uppercase tracking-index text-accent">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-muted">{edu.degree}</p>
                  <p className="mt-2 font-mono text-xs text-muted">{edu.date}</p>
                </div>
              </div>

              {edu.courses && (
                <figure className="border border-t-0 border-line bg-paper">
                  <div className="border-b border-line sm:h-[460px] sm:overflow-hidden">
                    <CourseIndex courses={edu.courses} />
                  </div>
                  <figcaption className="flex flex-col gap-1 px-4 py-3 font-mono text-[11px] uppercase tracking-index text-muted sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <span>Fig. 02 — Coursework</span>
                    <span className="normal-case tracking-normal sm:uppercase sm:tracking-index">
                      <span className="sm:hidden">Swipe codes · Tap to pin</span>
                      <span className="hidden sm:inline">Double-click to pin</span>
                    </span>
                  </figcaption>
                </figure>
              )}
            </article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Education
