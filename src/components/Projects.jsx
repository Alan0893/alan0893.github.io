import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ConveyorAnimation from '../animations/ConveyorAnimation'
import projectsData from '../data/projects.json'

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [filter, setFilter] = useState('pinned')
  const [hoveredProject, setHoveredProject] = useState(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const projects = projectsData.projects
  const categories = projectsData.categories

  const filteredProjects = filter === 'pinned'
    ? projects.filter((p) => p.pinned === true)
    : filter === 'all'
    ? projects
    : projects.filter((p) => p.categories && p.categories.includes(filter))

  return (
    <section id="projects" className="py-32 px-6">
      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
          <span className="text-accent font-mono">04.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Projects</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent" />
        </motion.div>

        {/* Disclaimer */}
        <motion.p variants={itemVariants} className="text-sm text-slate-400 mb-8 italic">
          Note: Some GitHub repositories and project links may have been made private or are no longer publicly accessible.
        </motion.p>

        {/* Filter Tabs */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                         ${filter === cat.id 
                           ? 'bg-accent text-white' 
                           : 'glass text-slate-400 hover:text-white hover:bg-white/10'
                         }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative"
                onMouseEnter={() => setHoveredProject(project.title)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative glass rounded-2xl p-6 h-full flex flex-col card-hover overflow-hidden">
                  {/* Folder icon */}
                  <div className="flex items-center justify-between mb-6">
                    <svg
                      className="w-10 h-10 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                    <div className="flex gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-slate-200 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-slate-200 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-slate-100 mb-3 group-hover:text-slate-200 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-400 mb-6 flex-1 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Year & Tags */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-3">
                      <span>{project.year}</span>
                      {project.associate && (
                        <span className="capitalize text-slate-500">{project.associate}</span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <div
                          key={`${project.title}-${tag}-${idx}`}
                          className="flex items-center gap-2 text-xs text-slate-500 font-mono"
                        >
                          {idx > 0 && <span className="text-slate-700">&middot;</span>}
                          <span>{tag}</span>
                        </div>
                      ))}
                      {project.tags.length > 3 && (
                        <div className="flex items-center gap-2 text-xs text-slate-600 font-mono">
                          <span className="text-slate-700">&middot;</span>
                          <span>+{project.tags.length - 3}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More */}
        <motion.div variants={itemVariants} className="text-center mt-12">
          <a
            href="https://github.com/Alan0893"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-slate-300
                       hover:bg-white/10 transition-all duration-300 font-medium"
          >
            View All on GitHub
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

        {/* Conveyor Animation */}
        <ConveyorAnimation />
      </motion.div>
    </section>
  )
}

export default Projects