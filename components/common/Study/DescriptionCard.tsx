export type Description = {
  title: string
  question: string
  recommendation: string
  notices: string[]
}

interface DescriptionCardProps {
  description: Description
  hasButton: boolean
}

export default function DescriptionCard({ description, hasButton }: DescriptionCardProps) {
  return (
    <div className="aspect-video w-full">
      <div>{description.title}</div>
      <div>{description.question}</div>
      <div>{description.recommendation}</div>
      <ul>
        {description.notices.map((notice) => (
          <li key={notice}>{notice}</li>
        ))}
      </ul>
    </div>
  )
}
