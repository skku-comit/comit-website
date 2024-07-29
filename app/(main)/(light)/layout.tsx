export default function LightLayout({ children }: { children: React.ReactNode }) {
  return <main className="flex min-h-dvh w-[1280px] flex-1 flex-col items-center">{children}</main>
}
