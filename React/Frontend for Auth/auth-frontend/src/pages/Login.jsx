import React from "react";
import { useState } from "react";
import InputField from "../components/InputFields";

const Login = ({ onSwitch, onSuccess }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    setError("");
    if (!form.email || !form.password) {
      setError("Both fields required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);
      if (typeof onSuccess === "function") {
        onSuccess(data.token, data.user); // This line checks if the onSuccess prop is a function and, if so, calls it with the token and user data received from the server. This allows the parent component (App.jsx) to handle the successful login by storing the token and user information, and navigating to the dashboard.
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <InputField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        type="email"
      />
      <InputField
        label="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
        type="password"
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      <p>
        No account?{" "}
        <span onClick={onSwitch} style={{ color: "blue", cursor: "pointer" }}>
          Register
        </span>
      </p>
    </div>
  );
};

export default Login;
