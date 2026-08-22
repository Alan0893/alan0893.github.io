import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({
  night: false,
  toggle: () => {},
})

const applyNight = (night) => {
  document.documentElement.classList.toggle('night', night)
  try {
    localStorage.setItem('theme', night ? 'night' : 'day')
  } catch {
    /* ignore */
  }
}

export const ThemeProvider = ({ children }) => {
  const [night, setNight] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('night')
  )

  useEffect(() => {
    applyNight(night)
  }, [night])

  const toggle = () => setNight((value) => !value)

  return (
    <ThemeContext.Provider value={{ night, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

export const ThemeToggle = () => {
  const { night, toggle } = useTheme()

  return (
    <button
      type="button"
      onClick={toggle}
      className="index-link font-mono text-[10px] uppercase tracking-index text-muted hover:text-accent"
      aria-pressed={night}
      aria-label={night ? 'Switch to day mode' : 'Switch to night mode'}
    >
      {night ? 'Day' : 'Night'}
    </button>
  )
}
