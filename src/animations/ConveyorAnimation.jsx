import React from 'react'
import footerData from '../data/footer.json'

const ICONS = {
  GitHub: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  LinkedIn: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  Email: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
}

const Pulley = ({ reverse = false }) => (
  <div
    className={`relative z-10 hidden h-16 w-16 shrink-0 text-ink sm:block ${
      reverse ? 'v4-pulley-reverse' : 'v4-pulley'
    }`}
    aria-hidden="true"
  >
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.45" />
      {[0, 45, 90, 135].map((deg) => (
        <line
          key={deg}
          x1="32"
          y1="6"
          x2="32"
          y2="14"
          stroke="currentColor"
          strokeWidth="1.25"
          transform={`rotate(${deg} 32 32)`}
        />
      ))}
      <circle cx="32" cy="32" r="5" fill="var(--color-accent)" />
      <circle cx="32" cy="32" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  </div>
)

const Track = ({ links }) => (
  <div className="flex shrink-0 items-center gap-10 px-5">
    {links.map((contact, i) => (
      <a
        key={`${contact.name}-${i}`}
        href={contact.url}
        target="_blank"
        rel="noopener noreferrer"
        className="contact-tile group/item flex items-center gap-2.5 text-ink"
      >
        <span className="contact-tile-mark flex h-9 w-9 items-center justify-center border border-line bg-paper transition-colors">
          {ICONS[contact.name]}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-index transition-colors">
          {contact.name}
        </span>
      </a>
    ))}
  </div>
)

const ConveyorAnimation = () => {
  const links = footerData.socialLinks
  const loop = [...links, ...links]

  return (
    <figure>
      <div className="group relative overflow-hidden border border-line">
        <div className="pointer-events-none absolute inset-x-0 top-[18%] border-t border-line" />
        <div className="pointer-events-none absolute inset-x-0 bottom-[18%] border-t border-line" />
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, var(--color-accent) 0 6px, transparent 6px 14px)',
            opacity: 0.35,
          }}
        />

        <div className="relative flex h-28 items-center gap-3 px-3">
          <Pulley />
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="flex w-max v4-belt">
              <Track links={loop} />
              <Track links={loop} />
            </div>
          </div>
          <Pulley reverse />
        </div>
      </div>
      <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-index text-muted">
        Fig. 04 — Contact belt
      </figcaption>

      <style>{`
        .v4-belt {
          animation: v4-belt 28s linear infinite;
        }
        .v4-pulley {
          animation: v4-rotate 8s linear infinite;
        }
        .v4-pulley-reverse {
          animation: v4-rotate 8s linear infinite reverse;
        }
        .group:hover .v4-belt,
        .group:hover .v4-pulley,
        .group:hover .v4-pulley-reverse {
          animation-play-state: paused;
        }
        @keyframes v4-belt {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes v4-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .v4-belt,
          .v4-pulley,
          .v4-pulley-reverse {
            animation: none !important;
          }
        }
      `}</style>
    </figure>
  )
}

export default ConveyorAnimation
