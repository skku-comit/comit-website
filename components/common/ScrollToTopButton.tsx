'use client'

import React from 'react'
import { IoIosArrowUp } from 'react-icons/io'

import { cn } from '@/lib/utils'

const ScrollToTopButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-4 right-4 transform rounded-full bg-slate-200 p-3 text-white transition-transform hover:scale-110 focus:outline-none',
        'z-50 shadow shadow-black focus:ring-2 focus:ring-blue-300'
      )}
      aria-label="Scroll to top"
    >
      <IoIosArrowUp color="black" size={24} />
    </button>
  )
}

export default ScrollToTopButton
