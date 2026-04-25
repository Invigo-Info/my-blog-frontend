import {client, urlFor} from '@/lib/sanity'
import Link from 'next/link'

export const revalidate = 0

const CATEGORY_QUERY = `{
  "category": *[_type == "category" && slug.current == $slug][0]{title, description},
  "posts": *[_type == "post" && $slug in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    contentUpdatedAt,
    readTime,
    "author": author->{name}
  }
}`

const formatShortDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

export default async function CategoryPage({params}: {params: {slug: string}}) {
  const {category, posts} = await client.fetch(CATEGORY_QUERY, {slug: params.slug})

  if (!category) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <p>Category not found.</p>
        <Link href="/" className="text-blue-600 underline">
          Back to homepage
        </Link>
      </main>
    )
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-gray-600 hover:underline">
        &larr; Back to all posts
      </Link>

      <div className="relative mt-4 mb-2">
        <div className="bg-slate-800 text-white px-5 py-2.5 inline-block rounded-sm">
          <h1 className="text-lg font-semibold tracking-wide">{category.title}</h1>
        </div>
        <div className="h-0.5 bg-red-600 w-full mt-0" />
      </div>

      {category.description && (
        <p className="text-gray-600 mb-8">{category.description}</p>
      )}

      {posts.length === 0 ? (
        <p className="text-gray-600">No posts in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 mt-6">
          {posts.map((post: any) => (
            <Link
              key={post._id}
              href={`/posts/${post.slug.current}`}
              className="flex gap-4 items-start group"
            >
              {post.mainImage ? (
                <img
                  src={urlFor(post.mainImage).width(280).height(200).url()}
                  alt={post.title}
                  className="w-32 h-24 object-cover rounded flex-shrink-0"
                />
              ) : (
                <div className="w-32 h-24 bg-gray-200 rounded flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <h2 className="text-blue-600 group-hover:underline font-semibold leading-snug text-[15px]">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-1.5 text-sm text-slate-600 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                {post.author?.name && (
                  <p className="mt-2 text-xs text-slate-500">
                    By {post.author.name}
                    {post.contentUpdatedAt ? (
                      <> · Updated {formatShortDate(post.contentUpdatedAt)}</>
                    ) : (
                      post.publishedAt && (
                        <> · {formatShortDate(post.publishedAt)}</>
                      )
                    )}
                    {typeof post.readTime === 'number' && (
                      <> · {post.readTime} min read</>
                    )}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
