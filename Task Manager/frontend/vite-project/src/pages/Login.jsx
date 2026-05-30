import { useState }  from "react"
import { useAuth }   from "../context/AuthContext"
import API           from "../api/axios"

function Login({ onSwitch }) {
  const { login }   = useAuth()
  const [form,    setForm]    = useState({ email: "", password: "" })
  const [error,   setError]   = useState("")
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    setError("")
    if (!form.email || !form.password) {
      setError("Both fields required")
      return
    }

    setLoading(true)
    try {
      const res = await API.post("/auth/login", form )
      login(res.data.user, res.data.token)
    } catch (err) {
      setError(err.response?.data?.error || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", padding: "2rem", border: "1px solid #eee", borderRadius: 12 }}>
      <h2 style={{ marginBottom: "1.5rem" }}>Login</h2>
      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

      <label>Email</label>
      <input name="email"    type="email"    value={form.email}    onChange={handleChange}
        style={{ display: "block", width: "100%", padding: 8, margin: "4px 0 12px", boxSizing: "border-box", borderRadius: 6, border: "1px solid #ddd" }} />

      <label>Password</label>
      <input name="password" type="password" value={form.password} onChange={handleChange}
        style={{ display: "block", width: "100%", padding: 8, margin: "4px 0 12px", boxSizing: "border-box", borderRadius: 6, border: "1px solid #ddd" }}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()} />

      <button onClick={handleSubmit} disabled={loading}
        style={{ width: "100%", padding: 10, background: "#7F77DD", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>
        { loading ? "Logging in..." : "Login" }
      </button>

      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        No account? <span onClick={onSwitch} style={{ color: "#7F77DD", cursor: "pointer" }}>Register</span>
      </p>
    </div>
  )
}

export default Login