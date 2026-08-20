import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import TypeCase from '../animations/TypeCase'
import SectionHeader from './SectionHeader'
import aboutData from '../data/about.json'

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="scroll-mt-24 px-6 py-24 lg:px-16">
      <motion.div
        ref={ref}
        className="max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeader number="01" title="About" kicker="Index" />

        <div className="space-y-5 text-lg leading-relaxed text-ink/90">
          <p>{aboutData.bio[0]}</p>
          <p className="text-muted">{aboutData.bio[1]}</p>
        </div>

        <div className="mt-12">
          <TypeCase texts={aboutData.skillCategories.flatMap((category) => category.items)} />
        </div>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-index text-muted">
          Fig. 02 — Type case
        </p>

        <div className="mt-16 space-y-10">
          {aboutData.skillCategories.map((category, index) => (
            <div key={category.title} className="border-t border-line pt-5">
              <div className="mb-4 flex items-baseline justify-between">
                <h3 className="font-display text-2xl italic">{category.title}</h3>
                <span className="font-mono text-[11px] text-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {category.items.map((item) => (
                  <li key={item} className="font-mono text-sm text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default About
