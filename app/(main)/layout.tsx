import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div
        className="mt-20 h-screen w-screen overflow-x-hidden overflow-y-scroll"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex w-full justify-center">{children}</div>
        <Footer />
      </div>
    </>
  )
}
