import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-blue-200/60 to-indigo-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-24 w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-indigo-200/50 to-pink-200/40 blur-3xl"
      />

      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div className="relative z-10 animate-[fadeUp_.7s_ease-out_both]">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            Fresh stories every week
          </span>

          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.05]">
            Ideas worth{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                reading
              </span>
              <span className="absolute left-0 right-0 -bottom-1 h-1 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-40" />
            </span>
            , crafted for curious minds.
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
            In-depth guides, honest reviews, and career insights — written by practitioners
            who still do the work. Settle in, pour a coffee, and learn something useful today.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#latest"
              className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/30"
            >
              Browse Latest
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </Link>
            <Link
              href="/#about"
              className="inline-flex items-center rounded-full border border-slate-300 bg-white/70 backdrop-blur px-5 py-3 text-sm font-semibold text-slate-800 transition-all duration-300 hover:border-slate-900 hover:-translate-y-0.5"
            >
              About the blog
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-slate-500">
            <div>
              <p className="text-2xl font-bold text-slate-900">120+</p>
              <p>Articles</p>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div>
              <p className="text-2xl font-bold text-slate-900">15k</p>
              <p>Monthly readers</p>
            </div>
            <div className="w-px h-10 bg-slate-200 hidden sm:block" />
            <div className="hidden sm:block">
              <p className="text-2xl font-bold text-slate-900">4.9★</p>
              <p>Reader rating</p>
            </div>
          </div>
        </div>

        <div className="relative animate-[fadeUp_.9s_ease-out_both]">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5">
            <img
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80"
              alt="Open notebook and pen — writing and storytelling"
              className="w-full h-[360px] md:h-[460px] object-cover transition-transform duration-[1.2s] ease-out hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent p-6">
              <p className="text-white/80 text-xs uppercase tracking-widest">Featured</p>
              <p className="text-white font-semibold text-lg leading-snug mt-1">
                Long-form writing is back — and readers are hungry for depth.
              </p>
            </div>
          </div>

          <div className="hidden md:flex absolute -left-6 bottom-10 items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 animate-[fadeUp_1.1s_ease-out_both]">
            <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-green-100 text-green-700">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <div className="text-left">
              <p className="text-xs text-slate-500">New post</p>
              <p className="text-sm font-semibold text-slate-900">Just published</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
