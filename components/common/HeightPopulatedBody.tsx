import { cn } from '@/lib/utils'

import Footer from './Footer'
import Header from './Header'

const HeightPopulatedDiv = ({
  headerHeight,
  footerHeight,
  children,
  className,
  style
}: {
  headerHeight: string
  footerHeight: string
  children: React.ReactNode
  className?: string
  style?: object
}) => {
  return (
    <div className={cn(className, 'h-screen')} style={style}>
      <Header height={headerHeight} />
      <div
        className="h-auto"
        style={{
          paddingTop: headerHeight,
          minHeight: '100%',
          paddingBottom: footerHeight
        }}
      >
        {children}
      </div>
      <Footer height={footerHeight} />
    </div>
  )
}

export default HeightPopulatedDiv
