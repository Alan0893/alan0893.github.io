import React, { useEffect, useState } from 'react'

const TypeCase = ({ texts = [] }) => {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!texts.length) return undefined
    const id = setInterval(() => {
      setActive((i) => (i + 1) % texts.length)
    }, 1100)
    return () => clearInterval(id)
  }, [texts.length])

  return (
    <div className="border border-line bg-paper">
      <div className="flex items-center justify-between border-b border-line px-3 py-2 font-mono text-[10px] uppercase tracking-index text-muted">
        <span>California job case</span>
        <span>{String(texts.length).padStart(2, '0')} sorts</span>
      </div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {texts.map((text, index) => {
          const isActive = index === active
          return (
            <li key={text} className="border-b border-r border-line last:border-b-0">
              <button
                type="button"
                onMouseEnter={() => setActive(index)}
                className={`flex h-14 w-full items-center justify-between gap-2 px-3 text-left transition-colors ${
                  isActive ? 'bg-ink text-paper' : 'bg-paper text-ink hover:bg-ink/5'
                }`}
              >
                <span className="truncate font-mono text-[11px]">{text}</span>
                <span className={`font-mono text-[10px] ${isActive ? 'text-paper/60' : 'text-muted'}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TypeCase
