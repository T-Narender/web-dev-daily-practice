import { AuthProvider, useAuth } from "./context/AuthContext"
import Login     from "./pages/Login"
import Register  from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import { useState } from "react"

function AppRoutes() {
  const { user }  = useAuth()
  const [page, setPage] = useState("login")

  // If logged in always show dashboard
  if (user) return <Dashboard />

  return (
    <>
      {page === "login"
        ? <Login    onSwitch={() => setPage("register")} />
        : <Register onSwitch={() => setPage("login")} />
      }
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App