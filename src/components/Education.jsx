import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import BouncingBalls from '../animations/BouncingBalls'
import educationData from '../data/education.json'

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  }

  const education = educationData.education

  return (
    <section id="education" className="py-32 px-6">
      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-16">
          <span className="text-accent font-mono">02.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Education</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent" />
        </motion.div>

        {/* Single card */}
        <div className="grid gap-8">
          {education.map((edu) => (
            <motion.div key={edu.school} variants={itemVariants} className="glass rounded-3xl p-6 md:p-8 border border-white/10">
              <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl glass p-3 flex items-center justify-center shadow-lg shadow-accent/15">
                    <img src={edu.logo} alt={edu.school} className="w-10 h-10 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-slate-50 flex items-center gap-2">
                      {edu.school}
                      {edu.current && (
                        <span className="px-2 py-0.5 text-xs font-mono rounded-full bg-accent/20 text-accent">
                          Current
                        </span>
                      )}
                    </h3>
                    <p className="text-slate-300">{edu.degree}</p>
                    <p className="text-sm font-mono text-slate-500 mt-1">{edu.date}</p>
                  </div>
                </div>

                {edu.courses && (
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold mb-3">
                      Relevant Coursework
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course) => (
                        <span
                          key={course}
                          className="px-3 py-1 text-xs rounded-full bg-white/8 text-slate-100 border border-white/5"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bouncing Balls Animation */}
        <div className="relative h-40 mt-12 overflow-hidden">
          <BouncingBalls />
        </div>
      </motion.div>
    </section>
  )
}

export default Education
