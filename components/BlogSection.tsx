import Link from 'next/link'
import {client, urlFor} from '@/lib/sanity'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  contentUpdatedAt,
  readTime,
  "author": author->{name, avatar}
}`

const formatShortDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

export default async function BlogSection() {
  const posts: any[] = await client.fetch(POSTS_QUERY)

  return (
    <section id="latest" className="scroll-mt-20 py-16 sm:py-20">
      <SectionHeader
        eyebrow="From the Blog"
        title="Latest stories, fresh off the desk"
        description="Deep-dives, field notes, and step-by-step guides from writers who've lived the work."
      />

      {posts.length === 0 ? (
        <Reveal>
          <p className="text-slate-600">No posts yet. Create one in your Sanity Studio.</p>
        </Reveal>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          {posts.map((post, i) => (
            <Reveal key={post._id} delay={i * 80} direction="up">
              <Link
                href={`/posts/${post.slug.current}`}
                className="flex gap-4 items-start group"
              >
                <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-slate-900/5">
                  {post.mainImage ? (
                    <img
                      src={urlFor(post.mainImage).width(320).height(240).url()}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-blue-600 group-hover:text-indigo-600 font-semibold leading-snug text-[15px] transition-colors duration-300">
                    {post.title}
                  </h3>
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
            </Reveal>
          ))}
        </div>
      )}
    </section>
  )
}
