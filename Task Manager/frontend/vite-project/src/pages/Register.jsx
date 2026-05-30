import { useState } from "react"
import API          from "../api/axios"

function Register({ onSwitch }) {
  const [form,    setForm]    = useState({ name: "", email: "", password: "" })
  const [error,   setError]   = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    setError("")
    setSuccess("")
    if (!form.name || !form.email || !form.password) {
      setError("All fields required")
      return
    }

    setLoading(true)
    try {
      await API.post("/auth/register", form )
      setSuccess("Registered! Please login.")
      setForm({ name: "", email: "", password: "" })
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", padding: "2rem", border: "1px solid #eee", borderRadius: 12 }}>
      <h2 style={{ marginBottom: "1.5rem" }}>Register</h2>
      {error   && <p style={{ color: "red"   }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {["name", "email", "password"].map(field => (
        <div key={field} style={{ marginBottom: 12 }}>
          <label style={{ textTransform: "capitalize" }}>{field}</label>
          <input
            name={field}
            type={field === "password" ? "password" : "text"}
            value={form[field]}
            onChange={handleChange}
            style={{ display: "block", width: "100%", padding: 8, marginTop: 4, boxSizing: "border-box", borderRadius: 6, border: "1px solid #ddd" }}
          />
        </div>
      ))}

      <button onClick={handleSubmit} disabled={loading}
        style={{ width: "100%", padding: 10, background: "#7F77DD", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>
        {loading ? "Registering..." : "Register"}
      </button>

      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Have an account? <span onClick={onSwitch} style={{ color: "#7F77DD", cursor: "pointer" }}>Login</span>
      </p>
    </div>
  )
}

export default Register