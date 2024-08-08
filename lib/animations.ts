export type Animation = {
  initial: object
  animate: object
  transition: object
  whileInView: object
  viewport: object
}
export type partialAnimation = Partial<Animation>

export type AnimationKey = keyof Animation

export const fadeInLeft = (duration: number = 0.5, delay: number = 0): partialAnimation => {
  return { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration, delay } }
}

export const fadeInRight = (duration: number = 0.5, delay: number = 0): partialAnimation => {
  return { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 }, transition: { duration, delay } }
}

export const fadeIn = (duration: number = 1, delay: number = 0): partialAnimation => {
  return { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration, delay } }
}
