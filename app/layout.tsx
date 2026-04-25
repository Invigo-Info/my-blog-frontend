import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({subsets: ['latin']})

const indexable = process.env.NEXT_PUBLIC_INDEX === 'true'

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'A blog built with Next.js and Sanity',
  robots: indexable
    ? {index: true, follow: true}
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {index: false, follow: false, noimageindex: true},
      },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900`}>
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
