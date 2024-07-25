export default function LightLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className="mt-20 flex h-fit w-full flex-1 flex-col items-center">
      {children}
    </main>
  )
}
