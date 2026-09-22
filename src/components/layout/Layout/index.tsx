import { Outlet } from 'react-router'
import { AiChatPanelProvider } from '../AiChatPanel/context'

// Components
import Header from '../Header'
import Footer from '../Footer'
import AiChatPanel from '../AiChatPanel'

function Layout() {

  return (
    <AiChatPanelProvider>
      <div className="flex flex-col w-full h-[100%] min-h-screen">
        <Header />
        <main>
          <div className="flex flex-col m-auto w-[90%] h-full 2xl:w-[80%]">
            <Outlet />
          </div>
        </main>
        <Footer />
        <AiChatPanel />
      </div>
    </AiChatPanelProvider>
  )
}

export default Layout
