import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import RunningStickman from '../animations/RunningStickman'
import experienceData from '../data/experiences.json'

const Experience = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const experiences = experienceData.experiences

  return (
    <section id="experience" className="py-32 px-6">
      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-16">
          <span className="text-accent font-mono">03.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Experience</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {experiences.map((exp, index) => (
            <motion.div key={exp.company} variants={itemVariants} className="relative grid grid-cols-1 sm:grid-cols-8 gap-4 sm:gap-8 mb-12 last:mb-0 group">
              {/* Timeline line and dot */}
              <div className="absolute left-0 sm:left-auto sm:right-[calc(100%-2rem)] top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent-teal/30 to-transparent sm:translate-x-[50%]" />
              <div
                className={`absolute left-[-7px] sm:left-auto sm:right-[calc(100%-2rem)] sm:translate-x-[50%] top-6 w-4 h-4 rounded-full border-4 border-slate-900 z-10
                           ${exp.current ? 'bg-accent shadow-[0_0_20px_rgba(99,102,241,0.4)] animate-pulse' : 'bg-accent-teal shadow-[0_0_12px_rgba(20,184,166,0.2)]'}`}
              />

              {/* Date */}
              <div className="sm:col-span-2 pl-6 sm:pl-0 sm:text-right">
                <span className="text-xs sm:text-sm font-mono text-slate-500 uppercase tracking-wide">
                  {exp.date}
                </span>
              </div>

              {/* Content */}
              <div className="sm:col-span-6 pl-6 sm:pl-0">
                <div className="glass rounded-2xl p-6 md:p-8 border border-white/10 backdrop-blur-md group-hover:border-white/20 transition-all">
                  {/* Header */}
                  <div className="flex flex-col gap-4 mb-6">
                    <div className="flex items-start gap-4">
                      {/* Company Logo */}
                      {exp.logo && (
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 p-2 flex items-center justify-center">
                          <img 
                            src={exp.logo} 
                            alt={`${exp.company} logo`}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none'
                            }}
                          />
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-semibold text-slate-50">
                          {exp.title}{' '}
                          <span className="text-slate-500">@</span>{' '}
                          <a
                            href={exp.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:text-accent-teal transition-colors"
                          >
                            {exp.company}
                          </a>
                        </h3>
                        {exp.current && (
                          <span className="inline-block px-2 py-0.5 text-xs font-mono rounded-full bg-accent/20 text-accent mt-2">
                            Current
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-3 mb-6">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="text-slate-300 text-sm flex gap-3 leading-relaxed">
                        <span className="text-accent mt-1.5 flex-shrink-0">▹</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs rounded-full bg-white/8 text-slate-100 border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Running Stickman */}
        <div className="relative mt-16 overflow-hidden">
          <RunningStickman />
        </div>
      </motion.div>
    </section>
  )
}

export default Experience