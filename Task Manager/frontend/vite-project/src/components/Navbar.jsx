import { useAuth } from "../context/AuthContext"

function Navbar() {
  const { user, logout } = useAuth()

  return (
    <div style={{ background: "#7F77DD", color: "white", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h2 style={{ margin: 0, fontSize: 18 }}>✅ TaskManager</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ fontSize: 14 }}>Hi, {user?.name}</span>
        <button onClick={logout}
          style={{ background: "white", color: "#7F77DD", border: "none", borderRadius: 6, padding: "6px 14px", cursor: "pointer", fontWeight: 600 }}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar