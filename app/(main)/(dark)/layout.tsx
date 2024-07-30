export default function DarkLayout({ children }: { children: React.ReactNode }) {
  return <main className="flex min-h-dvh flex-1 flex-col items-center bg-black">{children}</main>
}
