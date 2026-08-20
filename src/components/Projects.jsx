import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ConveyorAnimation from '../animations/ConveyorAnimation'
import SectionHeader from './SectionHeader'
import projectsData from '../data/projects.json'

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  const [filter, setFilter] = useState('pinned')
  const [openTitle, setOpenTitle] = useState(null)

  const projects = projectsData.projects
  const categories = projectsData.categories

  const filteredProjects = filter === 'pinned'
    ? projects.filter((p) => p.pinned === true)
    : filter === 'all'
    ? projects
    : projects.filter((p) => p.categories && p.categories.includes(filter))

  return (
    <section id="projects" className="scroll-mt-24 px-6 py-24 lg:px-16">
      <motion.div
        ref={ref}
        className="max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeader number="04" title="Projects" kicker="Selected work" />

        <p className="mb-8 text-sm italic text-muted">
          Some GitHub repositories and project links may have been made private or are no longer publicly accessible.
        </p>

        <div className="mb-10 flex flex-wrap gap-x-5 gap-y-2 border-b border-line pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`font-mono text-[11px] uppercase tracking-index transition-colors ${
                filter === cat.id ? 'text-accent' : 'text-muted hover:text-ink'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const isOpen = openTitle === project.title
              return (
                <motion.article
                  key={project.title}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border-t border-line"
                >
                  <button
                    type="button"
                    onClick={() => setOpenTitle(isOpen ? null : project.title)}
                    className="flex w-full items-baseline justify-between gap-4 py-5 text-left"
                  >
                    <span className="min-w-0">
                      <span className="flex items-baseline gap-3">
                        <span className="font-display text-2xl md:text-3xl leading-tight">
                          {project.title}
                        </span>
                        <span className="font-mono text-xs text-muted">{isOpen ? '–' : '+'}</span>
                      </span>
                      <span className="mt-1 block font-mono text-[11px] text-muted">
                        {[project.associate, project.tags.slice(0, 3).join(' · ')].filter(Boolean).join('  ·  ')}
                      </span>
                    </span>
                    <span className="shrink-0 font-mono text-[11px] uppercase text-muted">
                      {project.year}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6">
                          <p className="max-w-xl text-sm leading-relaxed text-ink/85">
                            {project.description}
                          </p>
                          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                            {project.associate && (
                              <span className="font-mono text-xs text-muted capitalize">
                                {project.associate}
                              </span>
                            )}
                            <span className="font-mono text-xs text-muted">
                              {project.tags.join('  ·  ')}
                            </span>
                          </div>
                          <div className="mt-4 flex gap-5">
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="index-link font-mono text-xs uppercase tracking-index text-accent"
                              >
                                Repository
                              </a>
                            )}
                            {project.demo && (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="index-link font-mono text-xs uppercase tracking-index text-accent"
                              >
                                Live
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              )
            })}
          </AnimatePresence>
          <div className="border-t border-line" />
        </div>

        <div className="mt-10">
          <a
            href="https://github.com/Alan0893"
            target="_blank"
            rel="noopener noreferrer"
            className="index-link font-mono text-xs uppercase tracking-index text-ink"
          >
            View all on GitHub →
          </a>
        </div>

        <div className="mt-16">
          <ConveyorAnimation />
        </div>
      </motion.div>
    </section>
  )
}

export default Projects
