'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useEffect, useMemo, useState} from 'react'

const navLinks = [
  {href: '/', label: 'Home', hash: ''},
  {href: '/#latest', label: 'Blog', hash: 'latest'},
  {href: '/#categories', label: 'Categories', hash: 'categories'},
  {href: '/#about', label: 'About', hash: 'about'},
  {href: '/#contact', label: 'Contact', hash: 'contact'},
]

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeHash, setActiveHash] = useState<string>('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, {passive: true})
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const sectionIds = useMemo(
    () => navLinks.map((l) => l.hash).filter(Boolean),
    []
  )

  useEffect(() => {
    if (pathname !== '/') {
      setActiveHash('')
      return
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const visible = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        })
        const topmost = sectionIds.find((id) => visible.has(id)) || ''
        setActiveHash(topmost)
      },
      {rootMargin: '-80px 0px -55% 0px', threshold: 0}
    )

    elements.forEach((el) => observer.observe(el))

    const onScrollTop = () => {
      if (window.scrollY < 80) setActiveHash('')
    }
    onScrollTop()
    window.addEventListener('scroll', onScrollTop, {passive: true})

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScrollTop)
    }
  }, [pathname, sectionIds])

  const isActive = (link: (typeof navLinks)[number]) => {
    if (pathname === '/') {
      if (link.hash === '') return activeHash === ''
      return activeHash === link.hash
    }
    if (link.href === '/') return false
    return pathname.startsWith(link.href.split('#')[0]) && link.href !== '/'
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md shadow-[0_1px_0_rgba(15,23,42,0.06)]'
          : 'bg-white'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="MyBlog home"
        >
          <span className="relative inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
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
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              My
            </span>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Blog
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`group relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  active ? 'text-blue-700' : 'text-slate-700 hover:text-blue-700'
                }`}
              >
                <span>{link.label}</span>
                <span
                  className={`pointer-events-none absolute left-3 right-3 -bottom-0.5 h-[3px] rounded-full bg-blue-700 origin-left transition-transform duration-300 ease-out ${
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            )
          })}
          <Link
            href="/#subscribe"
            className="ml-2 inline-flex items-center rounded-full bg-slate-900 text-white text-sm font-semibold px-4 py-2 transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5"
          >
            Subscribe
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <span className="relative w-5 h-5 block">
            <span
              className={`absolute left-0 top-1 w-5 h-0.5 bg-current rounded transition-transform duration-300 ${
                open ? 'translate-y-1.5 rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-2.5 w-5 h-0.5 bg-current rounded transition-opacity duration-200 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 top-4 w-5 h-0.5 bg-current rounded transition-transform duration-300 ${
                open ? '-translate-y-1.5 -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden border-t border-slate-100 transition-[max-height,opacity] duration-300 ease-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => {
            const active = isActive(link)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? 'text-blue-700 bg-blue-50 border-l-[3px] border-blue-700'
                    : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <Link
            href="/#subscribe"
            className="mt-2 inline-flex justify-center rounded-full bg-slate-900 text-white text-sm font-semibold px-4 py-2 hover:bg-blue-600 transition-colors"
          >
            Subscribe
          </Link>
        </nav>
      </div>
    </header>
  )
}
