import React, { useEffect, useRef, useState } from 'react'

const isCoarsePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

const CourseIndex = ({ courses = [] }) => {
  const [active, setActive] = useState(0)
  const [pinned, setPinned] = useState(false)
  const [paused, setPaused] = useState(false)
  const stripRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    if (paused || pinned || !courses.length) return undefined
    const id = setInterval(() => {
      setActive((i) => (i + 1) % courses.length)
    }, 2200)
    return () => clearInterval(id)
  }, [paused, pinned, courses.length])

  useEffect(() => {
    const strip = stripRef.current
    const item = itemRefs.current[active]
    if (!strip || !item) return
    if (strip.scrollWidth <= strip.clientWidth + 1) return

    const stripBox = strip.getBoundingClientRect()
    const itemBox = item.getBoundingClientRect()
    const delta = itemBox.left - stripBox.left - (stripBox.width - itemBox.width) / 2
    strip.scrollTo({
      left: strip.scrollLeft + delta,
      behavior: 'smooth',
    })
  }, [active])

  const previewCourse = (i) => {
    setActive(i)
    setPaused(true)
  }

  const handleClick = (i) => {
    if (isCoarsePointer()) {
      if (pinned && i === active) {
        setPinned(false)
        setPaused(false)
        return
      }
      setActive(i)
      setPaused(true)
      setPinned(true)
      return
    }

    if (pinned && i !== active) setPinned(false)
    setActive(i)
    setPaused(true)
  }

  const handleDoubleClick = (i) => {
    setActive(i)
    setPaused(true)
    setPinned(true)
  }

  const current = courses[active] || {}
  const currentName = current.name || ''
  const currentCode = current.code || ''
  const currentDescription = current.description || ''
  const currentUrl = current.url || ''

  return (
    <div
      className="flex h-full flex-col"
      onMouseLeave={() => {
        if (!pinned) setPaused(false)
      }}
    >
      <div className="relative min-h-0 sm:flex-1">
        <div
          ref={stripRef}
          className="flex overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [-webkit-overflow-scrolling:touch] sm:grid sm:h-full sm:grid-cols-7 sm:overflow-visible sm:[scrollbar-width:auto] [&::-webkit-scrollbar]:hidden sm:[&::-webkit-scrollbar]:block"
        >
          {courses.map((course, i) => {
            const isActive = i === active
            return (
              <button
                key={course.code || course.name}
                ref={(el) => {
                  itemRefs.current[i] = el
                }}
                type="button"
                title={course.name}
                onMouseEnter={() => {
                  if (!pinned) previewCourse(i)
                }}
                onClick={() => handleClick(i)}
                onDoubleClick={() => handleDoubleClick(i)}
                onFocus={() => previewCourse(i)}
                className={`relative flex w-[4.75rem] shrink-0 touch-manipulation flex-col items-center justify-center gap-0.5 border-b border-r border-line px-1 py-3 transition-colors sm:w-auto sm:flex-1 sm:py-1.5 ${
                  isActive ? 'bg-ink text-paper' : 'bg-paper text-ink hover:bg-ink/5'
                }`}
              >
                {pinned && isActive && (
                  <svg
                    className="absolute right-1 top-1 hidden h-3 w-3 text-accent sm:block"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-label="Pinned"
                  >
                    <path d="M16 9V4h1V2H7v2h1v5c0 1.66-1.34 3-3 3v2h5.2v6h1.6v-6H19v-2c-1.66 0-3-1.34-3-3z" />
                  </svg>
                )}
                <span className="whitespace-nowrap font-mono text-xs">{course.code}</span>
                <span
                  className={`hidden max-w-full px-0.5 text-center text-[9px] leading-tight sm:line-clamp-2 sm:block ${
                    isActive ? 'text-paper/70' : 'text-muted'
                  }`}
                >
                  {course.name}
                </span>
              </button>
            )
          })}
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-paper to-transparent sm:hidden"
          aria-hidden="true"
        />
      </div>
      <div className="border-t border-line px-4 py-3 sm:min-h-[8.5rem]">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <p className="flex items-start gap-2 font-display text-lg italic leading-tight text-ink sm:items-center sm:text-xl">
            {pinned && (
              <svg
                className="mt-1 h-3.5 w-3.5 shrink-0 text-accent sm:mt-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M16 9V4h1V2H7v2h1v5c0 1.66-1.34 3-3 3v2h5.2v6h1.6v-6H19v-2c-1.66 0-3-1.34-3-3z" />
              </svg>
            )}
            <span className="min-w-0 break-words">{currentName}</span>
          </p>
          {currentUrl ? (
            <a
              href={currentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="index-link shrink-0 font-mono text-[11px] uppercase tracking-index text-muted"
            >
              {currentCode}
            </a>
          ) : (
            <p className="shrink-0 font-mono text-[11px] uppercase tracking-index text-muted">
              {currentCode}
            </p>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{currentDescription}</p>
      </div>
    </div>
  )
}

export default CourseIndex
