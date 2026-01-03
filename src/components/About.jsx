import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import WordSphere from '../animations/WordSphere'
import aboutData from '../data/about.json'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const skillCategories = aboutData.skillCategories

  return (
    <section id="about" className="py-32 px-6">
      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-16">
          <span className="text-accent font-mono">01.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100">About Me</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left column - Bio */}
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-slate-300 text-lg leading-relaxed">
              {aboutData.bio[0]}
            </p>
            <p className="text-slate-400 leading-relaxed">
              {aboutData.bio[1]}
            </p>

            {/* Spinning WordSphere */}
            <div className="pt-6">
              <div className="flex justify-center">
                <WordSphere texts={skillCategories.flatMap((category) => category.items)} />
              </div>
            </div>
          </motion.div>

          {/* Right column - Skills */}
          <motion.div variants={itemVariants} className="space-y-8">
            {skillCategories.map((category) => (
              <div key={category.title}>
                <h3 className="text-sm font-mono text-slate-400 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#7c8aee' }} />
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="px-4 py-2 glass rounded-full text-sm text-slate-200 card-hover"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default About
