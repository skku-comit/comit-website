export default function DarkLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex h-fit w-full flex-1 flex-col items-center bg-black">
      {children}
    </main>
  )
}
