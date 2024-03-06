import Header from '@/components/admin/Header'
import SideBar from '@/components/admin/SideBar'
export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-dvh w-screen flex-col items-center">
      <Header />
      <SideBar />
      <div className="mt-20 flex w-full justify-center">{children}</div>
    </div>
  )
}
