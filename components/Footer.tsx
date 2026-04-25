import Link from 'next/link'

const quickLinks = [
  {href: '/', label: 'Home'},
  {href: '/#latest', label: 'Latest Blogs'},
  {href: '/#categories', label: 'Categories'},
  {href: '/#about', label: 'About'},
]

const resourceLinks = [
  {href: '/#contact', label: 'Contact'},
  {href: '/#privacy', label: 'Privacy Policy'},
  {href: '/#terms', label: 'Terms'},
  {href: '/#sitemap', label: 'Sitemap'},
]

const socials = [
  {
    href: 'https://twitter.com',
    label: 'Twitter',
    path: 'M22 5.8a8.49 8.49 0 0 1-2.36.64 4.13 4.13 0 0 0 1.81-2.27 8.21 8.21 0 0 1-2.61 1 4.1 4.1 0 0 0-7 3.74A11.64 11.64 0 0 1 3.39 4.62a4.16 4.16 0 0 0 1.27 5.49A4.09 4.09 0 0 1 2.8 9.6v.05a4.11 4.11 0 0 0 3.29 4 4.1 4.1 0 0 1-1.86.07 4.11 4.11 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 18.28a11.59 11.59 0 0 0 6.29 1.85c7.55 0 11.67-6.25 11.67-11.67v-.53A8.43 8.43 0 0 0 22 5.8z',
  },
  {
    href: 'https://github.com',
    label: 'GitHub',
    path: 'M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.03 11.03 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.82 1.18 3.07 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.04.77 2.1v3.11c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z',
  },
  {
    href: 'https://linkedin.com',
    label: 'LinkedIn',
    path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.44a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zm1.78 13.01H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z',
  },
]

export default function Footer() {
  return (
    <footer className="mt-24 bg-slate-900 text-slate-300">
      <div className="max-w-6xl mx-auto px-4 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-md transition-transform duration-300 group-hover:-rotate-6">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                <path d="M9 7h7" />
                <path d="M9 11h5" />
              </svg>
            </span>
            <span className="flex items-baseline">
              <span className="text-xl font-extrabold tracking-tight text-white">My</span>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Blog
              </span>
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-slate-400 max-w-md">
            Stories, tutorials, and career guides — published fresh from our studio and
            delivered to curious readers around the world.
          </p>

          <div className="mt-6 flex w-full max-w-md">
            <input
              type="email"
              placeholder="you@example.com"
              aria-label="Email address"
              className="flex-1 rounded-l-full bg-slate-800 border border-slate-700 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <button
              type="button"
              className="rounded-r-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/30"
            >
              Subscribe
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-block text-slate-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Resources
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {resourceLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-block text-slate-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} MyBlog. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/30"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
