export default function DarkLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className="relative flex h-auto min-h-dvh w-full flex-col items-center bg-black pt-20">
      {children}
    </main>
  )
}
