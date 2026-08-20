import React, { useEffect, useState } from 'react'

const CourseIndex = ({ courses = [] }) => {
  const [active, setActive] = useState(0)
  const [pinned, setPinned] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || pinned || !courses.length) return undefined
    const id = setInterval(() => {
      setActive((i) => (i + 1) % courses.length)
    }, 2200)
    return () => clearInterval(id)
  }, [paused, pinned, courses.length])

  const previewCourse = (i) => {
    setActive(i)
    setPaused(true)
  }

  const handleClick = (i) => {
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
      <div className="grid min-h-0 flex-1 grid-cols-3 sm:grid-cols-7">
        {courses.map((course, i) => {
          const isActive = i === active
          return (
            <button
              key={course.code || course.name}
              type="button"
              title={course.name}
              onMouseEnter={() => {
                if (!pinned) previewCourse(i)
              }}
              onClick={() => handleClick(i)}
              onDoubleClick={() => handleDoubleClick(i)}
              onFocus={() => previewCourse(i)}
              className={`relative flex flex-col items-center justify-center gap-0.5 border-b border-r border-line px-1 py-1.5 transition-colors ${
                isActive ? 'bg-ink text-paper' : 'bg-paper text-ink hover:bg-ink/5'
              }`}
            >
              {pinned && isActive && (
                <svg
                  className="absolute right-1 top-1 h-3 w-3 text-accent"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-label="Pinned"
                >
                  <path d="M16 9V4h1V2H7v2h1v5c0 1.66-1.34 3-3 3v2h5.2v6h1.6v-6H19v-2c-1.66 0-3-1.34-3-3z" />
                </svg>
              )}
              <span className="font-mono text-[11px] sm:text-xs">{course.code}</span>
              <span
                className={`max-w-full px-0.5 text-center text-[9px] leading-tight line-clamp-2 ${
                  isActive ? 'text-paper/70' : 'text-muted'
                }`}
              >
                {course.name}
              </span>
            </button>
          )
        })}
      </div>
      <div className="min-h-[8.5rem] border-t border-line px-4 py-3">
        <div className="flex items-baseline justify-between gap-4">
          <p className="flex items-center gap-2 font-display text-xl italic leading-tight text-ink">
            {pinned && (
              <svg
                className="h-3.5 w-3.5 shrink-0 text-accent"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M16 9V4h1V2H7v2h1v5c0 1.66-1.34 3-3 3v2h5.2v6h1.6v-6H19v-2c-1.66 0-3-1.34-3-3z" />
              </svg>
            )}
            {currentName}
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
