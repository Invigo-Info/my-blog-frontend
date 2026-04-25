import Reveal from './Reveal'

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <div className={`max-w-2xl mb-10 ${alignment}`}>
      <Reveal>
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            {eyebrow}
          </span>
        )}
      </Reveal>
      <Reveal delay={100}>
        <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={200}>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
