import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CourseAtlas from '../animations/CourseAtlas'
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

        <div className="space-y-10">
          {education.map((edu) => (
            <article key={edu.school} className="border border-line">
              <div className="flex items-start gap-5 border-b border-line p-6">
                {edu.logo && (
                  <img src={edu.logo} alt="" className="h-12 w-12 object-contain" />
                )}
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-3xl">{edu.school}</h3>
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
                <div className="p-6">
                  <p className="mb-4 font-mono text-[11px] uppercase tracking-index text-muted">
                    Relevant coursework
                  </p>
                  <ol className="columns-1 gap-x-10 sm:columns-2">
                    {edu.courses.map((course, i) => (
                      <li
                        key={course}
                        className="mb-2 break-inside-avoid font-mono text-sm text-ink"
                      >
                        <span className="mr-2 text-muted">{String(i + 1).padStart(2, '0')}</span>
                        {course}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </article>
          ))}
        </div>

        <figure className="mt-12 border border-line bg-paper">
          <div className="h-[320px] sm:h-[380px]">
            <CourseAtlas courses={education[0]?.courses ?? []} />
          </div>
        </figure>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-index text-muted">
          Fig. 03 — Curriculum
        </p>
      </motion.div>
    </section>
  )
}

export default Education
