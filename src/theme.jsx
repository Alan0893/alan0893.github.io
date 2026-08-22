import React, { createContext, useContext, useEffect, useState } from 'react'

const MODES = ['day', 'afternoon', 'night']

const ThemeContext = createContext({
  mode: 'day',
  night: false,
  afternoon: false,
  cycle: () => {},
})

const readMode = () => {
  if (typeof document === 'undefined') return 'day'
  const root = document.documentElement
  if (root.classList.contains('night')) return 'night'
  if (root.classList.contains('afternoon')) return 'afternoon'
  try {
    const stored = localStorage.getItem('theme')
    if (MODES.includes(stored)) return stored
  } catch {
    /* ignore */
  }
  return 'day'
}

const applyMode = (mode) => {
  document.documentElement.classList.toggle('night', mode === 'night')
  document.documentElement.classList.toggle('afternoon', mode === 'afternoon')
  try {
    localStorage.setItem('theme', mode)
  } catch {
    /* ignore */
  }
}

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(readMode)

  useEffect(() => {
    applyMode(mode)
  }, [mode])

  const cycle = () => {
    setMode((current) => MODES[(MODES.indexOf(current) + 1) % MODES.length])
  }

  return (
    <ThemeContext.Provider
      value={{
        mode,
        night: mode === 'night',
        afternoon: mode === 'afternoon',
        cycle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

const NEXT_LABEL = {
  day: 'Afternoon',
  afternoon: 'Night',
  night: 'Day',
}

export const ThemeToggle = () => {
  const { mode, cycle } = useTheme()
  const next = NEXT_LABEL[mode]

  return (
    <button
      type="button"
      onClick={cycle}
      className="index-link font-mono text-[10px] uppercase tracking-index text-muted hover:text-accent"
      aria-label={`Switch to ${next.toLowerCase()} mode`}
    >
      {next}
    </button>
  )
}
