'use client'

import {useEffect, useRef, useState, type ReactNode} from 'react'

type Direction = 'up' | 'left' | 'right' | 'scale'

export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: {
  children: ReactNode
  delay?: number
  direction?: Direction
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {threshold: 0.12, rootMargin: '0px 0px -60px 0px'}
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const hidden =
    direction === 'up'
      ? 'opacity-0 translate-y-6'
      : direction === 'left'
      ? 'opacity-0 -translate-x-6'
      : direction === 'right'
      ? 'opacity-0 translate-x-6'
      : 'opacity-0 scale-95'

  const shown = 'opacity-100 translate-x-0 translate-y-0 scale-100'

  return (
    <div
      ref={ref}
      style={{transitionDelay: `${delay}ms`}}
      className={`transition-all duration-700 ease-out will-change-transform ${
        visible ? shown : hidden
      } ${className}`}
    >
      {children}
    </div>
  )
}
