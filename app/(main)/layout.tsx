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
      style={{ webkitOverflowScrolling: 'touch' }}
    >
      <div className="flex min-h-dvh flex-col items-center">
        <Header />
        <div className="mt-20 flex w-full justify-center">{children}</div>
        <Footer />
      </div>
    </div>
  )
}
