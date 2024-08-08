export type Animation = {
  initial: object
  animate: object
  transition: object
  whileInView: object
}
export type partialAnimation = Partial<Animation>

export type AnimationKey = keyof Animation

export const fadeInLeft: partialAnimation = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 }
}

export const fadeInRight: partialAnimation = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 }
}
