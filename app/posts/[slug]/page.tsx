import {getClient, client, urlFor} from '@/lib/sanity'
import {PortableText} from '@portabletext/react'
import {draftMode} from 'next/headers'
import Link from 'next/link'
import type {Metadata} from 'next'

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

      {post.categories?.length > 0 && (
        <div className="flex gap-2 mt-4 mb-4">
          {post.categories.map((cat: any) => (
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
      )}

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      {post.author && (
        <div className="flex items-center gap-3 mb-6 pb-6 border-b">
          {post.author.avatar && (
            <img
              src={urlFor(post.author.avatar).width(48).height(48).url()}
              alt={post.author.name}
              className="w-12 h-12 rounded-full"
            />
          )}
          <div>
            <p className="font-semibold">{post.author.name}</p>
            {post.author.bio && (
              <p className="text-sm text-gray-600">{post.author.bio}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {post.publishedAt && <>Published {formatDate(post.publishedAt)}</>}
              {post.contentUpdatedAt && (
                <> · Updated {formatDate(post.contentUpdatedAt)}</>
              )}
              {typeof post.readTime === 'number' && (
                <> · {post.readTime} min read</>
              )}
            </p>
          </div>
        </div>
      )}

      {post.mainImage && (
        <img
          src={urlFor(post.mainImage).width(1200).url()}
          alt={post.title}
          className="rounded-lg mb-8 w-full"
        />
      )}

      <div className="prose prose-lg max-w-none">
        {post.body && <PortableText value={post.body} />}
      </div>
    </article>
  )
}
