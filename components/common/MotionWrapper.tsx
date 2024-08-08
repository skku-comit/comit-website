'use client'

import { motion, MotionProps } from 'framer-motion'
import React from 'react'

import { AnimationKey, partialAnimation } from '@/lib/animations'

interface CustomMotionProps<Tag extends keyof JSX.IntrinsicElements> extends MotionProps {
  type?: Tag
  children: React.ReactNode
  className?: string
  animation: partialAnimation
}

export const Motion = <Tag extends keyof JSX.IntrinsicElements>({
  type,
  children,
  className,
  animation,
  ...props
}: CustomMotionProps<Tag>) => {
  const Component = type ? (motion as any)[type] : motion.div

  const animationKeys: AnimationKey[] = ['initial', 'animate', 'transition', 'whileInView']
  const animationProps = animationKeys.reduce((acc, key) => {
    if (animation && animation[key]) {
      acc[key] = animation[key]
    }
    return acc
  }, {} as MotionProps)
  return (
    <Component className={className} {...props} {...animationProps}>
      {children}
    </Component>
  )
}
