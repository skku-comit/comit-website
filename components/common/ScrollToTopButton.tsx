'use client'

import React, { useEffect, useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'

import { cn } from '@/lib/utils'

const ScrollToTopButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Visibility Logic
  const VISIBILITY_LIMIT = 150
  const [isVisible, setIsVisible] = useState(true) // TODO: set default value to false when scroll bug is fixed
  const toggleVisibility = () => {
    if (window.scrollY > VISIBILITY_LIMIT) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className={cn(
          'fixed bottom-4 right-4 transform rounded-full bg-slate-100 p-3 text-white transition-transform hover:scale-110 focus:outline-none',
          'z-50 shadow shadow-black focus:ring-2 focus:ring-blue-300'
        )}
        aria-label="Scroll to top"
      >
        <IoIosArrowUp color="black" size={24} />
      </button>
    )
  )
}

export default ScrollToTopButton
