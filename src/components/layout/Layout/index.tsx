// Components
import Header from '../Header'
import Footer from '../Footer'

// Types
import { ReactNode } from 'react'

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col w-full h-[100%] min-h-screen">
      <Header />
      <main>
        <div className="flex flex-col m-auto w-[90%] h-full 2xl:w-[80%]">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
