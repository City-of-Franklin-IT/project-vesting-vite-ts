import styles from './Layout.module.css'

// Components
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

// Types
import { ReactNode } from 'react'

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <Header />
      <main>
        <div className={styles.container}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
