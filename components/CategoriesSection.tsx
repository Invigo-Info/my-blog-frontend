import Link from 'next/link'
import {client} from '@/lib/sanity'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

const CATEGORIES_QUERY = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  color,
  "postCount": count(*[_type == "post" && references(^._id)])
}`

const gradients: Record<string, string> = {
  blue: 'from-blue-500 to-indigo-600',
  green: 'from-emerald-500 to-teal-600',
  purple: 'from-purple-500 to-fuchsia-600',
  orange: 'from-amber-500 to-orange-600',
}

const fallbackGradients = [
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-purple-500 to-fuchsia-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
  'from-cyan-500 to-sky-600',
]

export default async function CategoriesSection() {
  const categories: any[] = await client.fetch(CATEGORIES_QUERY)

  return (
    <section id="categories" className="scroll-mt-20 py-16 sm:py-20 border-t border-slate-200">
      <SectionHeader
        eyebrow="Browse by topic"
        title="Explore our categories"
        description="Jump straight to the subjects you care about — every category has a handpicked reading list."
      />

      {categories.length === 0 ? (
        <Reveal>
          <p className="text-slate-600">No categories yet.</p>
        </Reveal>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => {
            const gradient =
              gradients[cat.color] || fallbackGradients[i % fallbackGradients.length]
            return (
              <Reveal key={cat._id} delay={i * 80} direction="up">
                <Link
                  href={`/categories/${cat.slug}`}
                  className="group relative block h-full rounded-2xl overflow-hidden bg-white ring-1 ring-slate-900/5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500 blur-2xl`} />

                  <div className="relative p-6">
                    <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <rect x="3" y="3" width="7" height="7" rx="1.5" />
                        <rect x="14" y="3" width="7" height="7" rx="1.5" />
                        <rect x="3" y="14" width="7" height="7" rx="1.5" />
                        <rect x="14" y="14" width="7" height="7" rx="1.5" />
                      </svg>
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-white transition-colors duration-500">
                      {cat.title}
                    </h3>
                    {cat.description ? (
                      <p className="mt-2 text-sm text-slate-600 group-hover:text-white/90 transition-colors duration-500">
                        {cat.description}
                      </p>
                    ) : (
                      <p className="mt-2 text-sm text-slate-500 group-hover:text-white/80 transition-colors duration-500">
                        Browse every article filed under {cat.title.toLowerCase()}.
                      </p>
                    )}

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 group-hover:text-white/80 transition-colors duration-500">
                        {cat.postCount || 0} {cat.postCount === 1 ? 'post' : 'posts'}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 group-hover:text-white transition-colors duration-500">
                        Explore
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
                          <path d="M5 12h14" />
                          <path d="m13 6 6 6-6 6" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      )}
    </section>
  )
}
