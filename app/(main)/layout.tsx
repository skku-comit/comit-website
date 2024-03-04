import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className="h-screen w-screen overflow-x-hidden overflow-y-scroll"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <div className="flex min-h-dvh flex-col items-center">
        <Header />
        <div className="flex w-full justify-center pt-20">{children}</div>
        <Footer />
      </div>
    </div>
  )
}
