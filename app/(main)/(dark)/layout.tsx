import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'

export default function DarkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header isDarkMode={true} />
      <div
        className="mt-20 h-screen w-screen overflow-x-hidden overflow-y-scroll"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex w-full justify-center">
          <main className="flex min-h-dvh flex-1 flex-col items-center bg-black">{children}</main>
        </div>
        <Footer />
      </div>
    </>
  )
}
