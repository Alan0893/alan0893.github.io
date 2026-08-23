import React, { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import MarginSketch from './animations/MarginSketch'

const About = lazy(() => import('./components/About'))
const Education = lazy(() => import('./components/Education'))
const Experience = lazy(() => import('./components/Experience'))
const Projects = lazy(() => import('./components/Projects'))

const LoadingFallback = () => (
  <div className="flex items-center justify-center py-24">
    <span className="font-mono text-xs tracking-index uppercase text-muted">Loading</span>
  </div>
)

function App() {
  return (
    <div className="relative min-h-screen paper-grid paper-noise">
      <Navbar />
      <MarginSketch />

      <main className="relative z-10 lg:pl-[28rem] xl:pr-64 min-[1440px]:pr-80 2xl:pr-96">
        <Hero />
        <Suspense fallback={<LoadingFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <Education />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <Projects />
        </Suspense>
        <Footer />
      </main>
    </div>
  )
}

export default App
