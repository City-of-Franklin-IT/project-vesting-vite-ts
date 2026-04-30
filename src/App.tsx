import { BrowserRouter as Router, Route, Routes } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from "react-toastify"
import { APP_BASE } from "./config"
import { AuthCtxProvider } from "./context/Auth"
import 'react-toastify/dist/ReactToastify.css'

// Components
import Layout from "./components/layout/Layout"
import Projects from "./pages/Projects"
import Create from "./pages/Create"
import Update from "./pages/Update"
import Docs from "./pages/Docs"
import Login from "./pages/Login"
import Redirect from "./pages/Redirect"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthCtxProvider>
        <Router basename={APP_BASE}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Login />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/create" element={<Create />} />
              <Route path="/update/:uuid" element={<Update />} />
              <Route path="/docs" element={<Docs />} />
            </Route>
            <Route path="/*" element={<Redirect />} />
          </Routes>
        </Router>
        <ToastContainer />
      </AuthCtxProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App