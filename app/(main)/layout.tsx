import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-start overflow-y-scroll"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <Header />
      {children}
      <Footer />
    </div>
  )
}
