import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

const contactInfo = [
  {
    label: 'Email',
    value: 'hello@myblog.com',
    href: 'mailto:hello@myblog.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 6-10 7L2 6" />
      </svg>
    ),
  },
  {
    label: 'Call',
    value: '+1 (555) 010-2023',
    href: 'tel:+15550102023',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: 'Studio',
    value: 'Bengaluru, India',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
]

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 py-16 sm:py-20 border-t border-slate-200">
      <SectionHeader
        eyebrow="Get in touch"
        title="Say hello — we write back."
        description="Pitch a topic, flag a typo, or just share what you're working on. We read every message."
      />

      <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
        <Reveal direction="left" className="lg:col-span-2">
          <div className="space-y-4">
            {contactInfo.map((c, i) => (
              <a
                key={c.label}
                href={c.href}
                className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-slate-900/5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5 group"
                style={{transitionDelay: `${i * 60}ms`}}
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-600/20 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                  {c.icon}
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-wider text-slate-500">{c.label}</p>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5">{c.value}</p>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-600">
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal direction="right" delay={120} className="lg:col-span-3">
          <div className="relative rounded-3xl bg-white p-6 sm:p-8 ring-1 ring-slate-900/5 shadow-lg shadow-slate-900/5 overflow-hidden">
            <div aria-hidden="true" className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-blue-200/50 to-indigo-200/40 blur-3xl" />
            <div className="relative grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">Your name</span>
                <input
                  type="text"
                  placeholder="Ada Lovelace"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">Email</span>
                <input
                  type="email"
                  placeholder="ada@example.com"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">Subject</span>
                <input
                  type="text"
                  placeholder="Pitch, feedback, or question"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">Message</span>
                <textarea
                  rows={5}
                  placeholder="Tell us what's on your mind…"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                />
              </label>
              <div className="sm:col-span-2 flex items-center justify-between flex-wrap gap-3">
                <p className="text-xs text-slate-500">Usually reply within 1–2 business days.</p>
                <button
                  type="button"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/30"
                >
                  Send message
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
