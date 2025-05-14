import { BrowserRouter as Router, Route, Routes } from "react-router"
import { AppProvider } from "./context/App/AppContext"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from "react-toastify"
import { APP_BASE } from "./config"
import 'react-toastify/dist/ReactToastify.css'

// Components
import Projects from "./pages/Projects"
import Create from "./pages/Create"
import Update from "./pages/Update"
import Login from "./pages/Login"
import Redirect from "./pages/Redirect"

const queryClient = new QueryClient()

function App() {
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <Router basename={APP_BASE}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/create" element={<Create />} />
            <Route path="/update" element={<Update />} />
            <Route path="/*" element={<Redirect />} />
          </Routes>
        </Router>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AppProvider>
  )
}

export default App
