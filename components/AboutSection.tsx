import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

const features = [
  {
    title: 'Written by practitioners',
    body: 'Every post comes from someone who still does the work — not a content farm.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    ),
  },
  {
    title: 'No fluff, just signal',
    body: 'Long-form when depth earns it, short when it doesn\'t. We respect your time.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: 'Updated, not abandoned',
    body: 'Evergreen guides get revisited when the facts change. No rotting articles.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
        <path d="M3 21v-5h5" />
      </svg>
    ),
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 py-16 sm:py-20 border-t border-slate-200">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <SectionHeader
            eyebrow="About the blog"
            title="Where curious readers come to go deeper."
            description="MyBlog is an independent, reader-supported publication. We publish careful writing on careers, craft, and the quiet details that make the difference."
          />

          <div className="space-y-5">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 100} direction="left">
                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-600/20 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{f.title}</h3>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">{f.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal direction="right" delay={150}>
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                alt="Stacked books and reading desk"
                className="w-full h-[420px] object-cover transition-transform duration-[1.2s] ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white px-5 py-4 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 max-w-[220px]">
              <p className="text-xs uppercase tracking-wider text-slate-500">Est. 2024</p>
              <p className="mt-1 text-sm font-semibold text-slate-900 leading-snug">
                Read by readers in 40+ countries.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
