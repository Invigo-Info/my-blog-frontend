import {getClient, client, urlFor} from '@/lib/sanity'
import {PortableText, type PortableTextComponents} from '@portabletext/react'
import {draftMode} from 'next/headers'
import Link from 'next/link'
import type {Metadata} from 'next'

const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({children}) => (
      <h1 className="mt-14 mb-5 text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
        {children}
      </h1>
    ),
    h2: ({children}) => (
      <h2 className="mt-12 mb-4 text-3xl font-bold tracking-tight text-slate-900 leading-tight">
        {children}
      </h2>
    ),
    h3: ({children}) => (
      <h3 className="mt-9 mb-3 text-2xl font-semibold tracking-tight text-slate-900 leading-snug">
        {children}
      </h3>
    ),
    h4: ({children}) => (
      <h4 className="mt-7 mb-2 text-xl font-semibold text-slate-900 leading-snug">
        {children}
      </h4>
    ),
    blockquote: ({children}) => (
      <blockquote className="my-6 border-l-4 border-slate-300 pl-5 italic text-slate-700">
        {children}
      </blockquote>
    ),
    normal: ({children, value}) => {
      const spans = (value as any)?.children ?? []
      const allBold =
        spans.length > 0 &&
        spans.every(
          (s: any) =>
            s?._type === 'span' &&
            typeof s.text === 'string' &&
            (s.text.trim() === '' || (Array.isArray(s.marks) && s.marks.includes('strong'))),
        )
      const text: string = spans
        .map((s: any) => s?.text ?? '')
        .join('')
        .trim()
      const looksLikeHeading =
        allBold && text.length > 0 && text.length < 140 && !/[.!]$/.test(text)
      if (looksLikeHeading) {
        const isAllCaps = text === text.toUpperCase() && /[A-Z]/.test(text)
        return isAllCaps ? (
          <h2 className="mt-12 mb-4 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
            {text}
          </h2>
        ) : (
          <h3 className="mt-9 mb-3 text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 leading-snug">
            {text}
          </h3>
        )
      }
      return (
        <p className="my-5 text-[17px] leading-[1.75] text-slate-800">{children}</p>
      )
    },
  },
  list: {
    bullet: ({children}) => (
      <ul className="my-5 ml-6 list-disc space-y-2 text-[17px] leading-[1.75] text-slate-800 marker:text-slate-400">
        {children}
      </ul>
    ),
    number: ({children}) => (
      <ol className="my-5 ml-6 list-decimal space-y-2 text-[17px] leading-[1.75] text-slate-800 marker:text-slate-500">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({children}) => <li className="pl-1">{children}</li>,
    number: ({children}) => <li className="pl-1">{children}</li>,
  },
  types: {
    table: ({value}) => {
      const rows: Array<{cells?: string[]}> = value?.rows || []
      if (!rows.length) return null
      const firstRowIsHeader = !!value?.firstRowIsHeader
      const firstColumnIsHeader = !!value?.firstColumnIsHeader
      const headerRow = firstRowIsHeader ? rows[0] : null
      const bodyRows = firstRowIsHeader ? rows.slice(1) : rows
      return (
        <div className="my-7 overflow-x-auto rounded-lg ring-1 ring-slate-200">
          <table className="w-full border-collapse text-[15px] leading-relaxed">
            {headerRow && (
              <thead className="bg-slate-50 text-slate-900">
                <tr>
                  {(headerRow.cells || []).map((cell, i) => (
                    <th
                      key={i}
                      className="border-b border-slate-200 px-4 py-3 text-left font-semibold"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {bodyRows.map((row, ri) => (
                <tr
                  key={ri}
                  className={ri % 2 === 1 ? 'bg-slate-50/40' : ''}
                >
                  {(row.cells || []).map((cell, ci) => {
                    const isHeaderCell = firstColumnIsHeader && ci === 0
                    const Tag = isHeaderCell ? 'th' : 'td'
                    return (
                      <Tag
                        key={ci}
                        className={`border-b border-slate-100 px-4 py-3 align-top ${
                          isHeaderCell
                            ? 'font-semibold text-slate-900 text-left bg-slate-50/60'
                            : 'text-slate-800'
                        }`}
                      >
                        {cell}
                      </Tag>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },
  },
  marks: {
    link: ({children, value}) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="text-blue-600 underline underline-offset-2 hover:text-blue-700"
      >
        {children}
      </a>
    ),
    strong: ({children}) => <strong className="font-semibold text-slate-900">{children}</strong>,
    em: ({children}) => <em className="italic">{children}</em>,
  },
}

export const revalidate = 0

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  title,
  body,
  mainImage,
  publishedAt,
  contentUpdatedAt,
  readTime,
  metaTitle,
  metaDescription,
  excerpt,
  "author": author->{name, slug, avatar, bio, twitter},
  "categories": categories[]->{title, slug, color}
}`

const META_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  title,
  excerpt,
  metaTitle,
  metaDescription,
  mainImage
}`

export async function generateMetadata({
  params,
}: {
  params: {slug: string}
}): Promise<Metadata> {
  const post = await client.fetch<{
    title?: string
    excerpt?: string
    metaTitle?: string
    metaDescription?: string
    mainImage?: unknown
  } | null>(META_QUERY, {slug: params.slug})

  if (!post) return {}

  const title = post.metaTitle || post.title
  const description = post.metaDescription || post.excerpt
  const ogImage = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: ogImage ? [{url: ogImage}] : undefined,
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

const categoryColors: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  green: 'bg-green-100 text-green-800 hover:bg-green-200',
  purple: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
  orange: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
}

export default async function Post({params}: {params: {slug: string}}) {
  const {isEnabled: isDraftMode} = draftMode()
  const client = getClient(isDraftMode)
  const post = await client.fetch(POST_QUERY, {slug: params.slug})

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto p-8">
        <p>Post not found.</p>
        <Link href="/" className="text-blue-600 underline">
          Back to homepage
        </Link>
      </main>
    )
  }

  return (
    <article className="max-w-3xl mx-auto p-8">
      {isDraftMode && (
        <div className="bg-yellow-100 border border-yellow-300 rounded p-3 mb-6 flex justify-between items-center">
          <span className="text-sm text-yellow-900">Preview mode enabled</span>
          <Link href="/api/exit-preview" className="text-sm underline text-yellow-900">
            Exit preview
          </Link>
        </div>
      )}

      <Link href="/" className="text-sm text-gray-600 hover:underline">
        &larr; Back to all posts
      </Link>

      {(() => {
        const categories = (post.categories || []).filter(
          (c: any) => c?.slug?.current,
        )
        if (categories.length === 0) return null
        return (
          <div className="flex gap-2 mt-4 mb-4">
            {categories.map((cat: any) => (
              <Link
                key={cat.slug.current}
                href={`/categories/${cat.slug.current}`}
                className={`px-3 py-1 text-xs rounded-full ${
                  categoryColors[cat.color] || 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {cat.title}
              </Link>
            ))}
          </div>
        )
      })()}

      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
        {post.title}
      </h1>

      {post.author && (
        <div className="flex items-start gap-4 mb-8 pb-8 border-b border-slate-200">
          {post.author.avatar && (
            <img
              src={urlFor(post.author.avatar).width(56).height(56).url()}
              alt={post.author.name}
              className="w-14 h-14 rounded-full flex-shrink-0 ring-1 ring-slate-200"
            />
          )}
          <div className="flex-1 min-w-0 space-y-1.5">
            <p className="font-semibold text-slate-900 leading-tight">
              {post.author.name}
            </p>
            {post.author.bio && (
              <p className="text-sm text-slate-600 leading-relaxed">
                {post.author.bio}
              </p>
            )}
            <p className="text-xs text-slate-500 pt-1 flex flex-wrap gap-x-2 gap-y-1">
              {post.publishedAt && (
                <span>Published {formatDate(post.publishedAt)}</span>
              )}
              {post.contentUpdatedAt && (
                <>
                  <span aria-hidden>·</span>
                  <span>Updated {formatDate(post.contentUpdatedAt)}</span>
                </>
              )}
              {typeof post.readTime === 'number' && (
                <>
                  <span aria-hidden>·</span>
                  <span>{post.readTime} min read</span>
                </>
              )}
            </p>
          </div>
        </div>
      )}

      {post.mainImage && (
        <img
          src={urlFor(post.mainImage).width(1200).url()}
          alt={post.title}
          className="rounded-lg mb-10 w-full"
        />
      )}

      <div className="max-w-none">
        {post.body && (
          <PortableText value={post.body} components={portableTextComponents} />
        )}
      </div>
    </article>
  )
}
