import { AiOutlineLoading } from 'react-icons/ai'

interface LoadingSpinnerProps {
  size?: number
}

export default function LoadingSpinner({ size = 84 }: LoadingSpinnerProps) {
  return <AiOutlineLoading className="animate-spin" size={size} />
}
