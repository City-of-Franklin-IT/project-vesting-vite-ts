import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { AppProvider } from "./context/App/AppContext"
import { CookiesProvider } from "react-cookie"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from "react-toastify"
import { APP_BASE } from "./config"
import { UserProvider } from "./context/User/UserContext"
import 'react-toastify/dist/ReactToastify.css'
import './animations.css'

// Components
import Home from "./pages/Home/Home"
import Create from "./pages/Create/Create"
import Update from "./pages/Update/Update"
import Login from "./pages/Login/Login"
import NotFound from "./pages/NotFound/NotFound"

const queryClient = new QueryClient()

function App() {
  return (
    <UserProvider>
      <AppProvider>
        <CookiesProvider>
          <QueryClientProvider client={queryClient}>
            <Router basename={APP_BASE} future={{ v7_startTransition: true }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<Create />} />
                <Route path="/update" element={<Update />} />
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </Router>
            <ToastContainer />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </CookiesProvider>
      </AppProvider>
    </UserProvider>
  )
}

export default App
