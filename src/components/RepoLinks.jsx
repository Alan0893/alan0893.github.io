import React from 'react'

const SHORT_LABELS = {
  'https://github.com/rh-ai-quickstart/RAG': 'RAG',
  'https://github.com/rh-ai-quickstart/ai-architecture-charts': 'Helm charts',
  'https://github.com/rh-ai-quickstart/it-self-service-agent': 'IT self-service',
  'https://github.com/rh-ai-quickstart/ai-driven-network-remediation': 'Network remediation',
  'https://github.com/rh-ai-quickstart/quickstart-factory': 'Quickstart factory',
  'https://github.com/Alan0893/ai-taxi-anomaly-detector': 'Taxi anomaly',
  'https://github.com/BU-Spark/se-symbiota': 'Symbiota',
  'https://github.com/BU-Spark/spark-symbiota-ml': 'Specimen ML',
  'https://github.com/BU-Spark/herbaria-ocr-middleware': 'OCR middleware',
  'https://github.com/BU-Spark/se-Symbiota-portal-reference-only': 'Portal reference',
  'https://github.com/bos-police-index/bp-index-public': 'Police Index',
  'https://github.com/BU-Spark/se-bu-eng-3d-printing-robot': '3D printing',
  'https://github.com/BU-Spark/se-kimberly-rhoten-mola': 'Resource map',
}

const repoPath = (url) => {
  try {
    return new URL(url).pathname.replace(/^\//, '')
  } catch {
    return url
  }
}

const repoLabel = (repo) => {
  if (SHORT_LABELS[repo.url]) return SHORT_LABELS[repo.url]
  if (repo.label) return repo.label
  return (repo.name || repoPath(repo.url).split('/').pop() || 'Repository')
    .replace(/[-_]+/g, ' ')
}

const GitHubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="mr-1.5 inline-block h-3.5 w-3.5 align-[-2px] text-ink"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const LinkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="mr-1.5 inline-block h-3.5 w-3.5 align-[-2px] text-ink"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
)

const NpmIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="mr-1.5 inline-block h-3.5 w-3.5 align-[-2px] text-ink"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
  </svg>
)

const InlineLinks = ({ icon, label, items, titleFor }) => {
  if (!items.length) return null

  return (
    <p className="mt-3 pl-5 -indent-5 font-mono text-[11px] leading-6 text-muted">
      <span title={label}>
        {icon}
        <span className="sr-only">{label}</span>
      </span>
      {items.map((item, index) => (
        <span key={item.url}>
          {index > 0 && <span className="text-line">  ·  </span>}
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={titleFor ? titleFor(item) : item.url}
            className="index-link whitespace-nowrap text-accent"
          >
            {item.label || repoLabel(item)}
          </a>
        </span>
      ))}
    </p>
  )
}

const RepoLinks = ({ repos = [], packages = [], deployments = [] }) => {
  const links = repos.filter((repo) => repo?.url)
  const pkgs = packages.filter((item) => item?.url)
  const lives = deployments.filter((item) => item?.url)
  if (links.length === 0 && pkgs.length === 0 && lives.length === 0) return null

  return (
    <div className="mt-1">
      <InlineLinks
        icon={<GitHubIcon />}
        label="GitHub repositories"
        items={links}
        titleFor={(item) => repoPath(item.url)}
      />
      <InlineLinks
        icon={<NpmIcon />}
        label="Packages"
        items={pkgs}
        titleFor={(item) => item.url}
      />
      <InlineLinks
        icon={<LinkIcon />}
        label="Live deployments"
        items={lives}
        titleFor={(item) => item.url}
      />
    </div>
  )
}

export default RepoLinks
