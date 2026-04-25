import Hero from '@/components/Hero'
import BlogSection from '@/components/BlogSection'
import CategoriesSection from '@/components/CategoriesSection'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'

export const revalidate = 0

export default function Home() {
  return (
    <>
      <Hero />
      <main className="max-w-6xl mx-auto px-4">
        <BlogSection />
        <CategoriesSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  )
}
