declare module 'react-rating-stars-component' {
  interface ReactStarsProps {
    count?: number
    value?: number
    onChange?: (newRating: number) => void
    size?: number
    isHalf?: boolean
    emptyIcon?: JSX.Element
    halfIcon?: JSX.Element
    filledIcon?: JSX.Element
    color?: string
    activeColor?: string
    edit?: boolean
  }

  const ReactStars: React.FC<ReactStarsProps>

  export default ReactStars
}
