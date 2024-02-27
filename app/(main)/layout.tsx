import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-dvh flex-col items-center overflow-x-hidden">
      <Header />
      <main className="mt-20 flex w-full flex-1 flex-col items-center">
        {children}
      </main>
      <Footer />
    </div>
  )
}
