import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ConveyorAnimation from '../animations/ConveyorAnimation'
import SectionHeader from './SectionHeader'
import RepoLinks from './RepoLinks'
import projectsData from '../data/projects.json'

const projectRepos = (project) =>
  (project.repos || []).filter((repo) => repo?.url)

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05, initialInView: true })
  const [openTitle, setOpenTitle] = useState(null)
  const projects = projectsData.projects

  return (
    <section id="projects" className="scroll-mt-24 px-6 py-24 lg:px-16">
      <motion.div
        ref={ref}
        className="max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeader number="04" title="Projects" kicker="Work" />

        <p className="mb-8 text-sm italic text-muted">
          Some GitHub repositories and project links may have been made private or are no longer publicly accessible.
        </p>

        <div>
          <AnimatePresence>
            {projects.map((project) => {
              const isOpen = openTitle === project.title
              const repos = projectRepos(project)
              const tags = project.tags || []
              return (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
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
                        {tags.join(' · ')}
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
                          <RepoLinks
                            repos={repos}
                            packages={project.packages}
                            deployments={
                              project.demo
                                ? [{ name: 'Live', url: project.demo, label: 'Live' }]
                                : []
                            }
                          />
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
            View profile on GitHub →
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
