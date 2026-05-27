import React, { useState } from "react";
import InputField from "../components/InputFields";

const Register = ({ onSwitch }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value }); // This line updates the form state by creating a new object that contains all the existing properties of the form and then updates the specific property (name, email, or password) based on the name attribute of the input field that triggered the change event.
  }

  async function handleSubmit() {
    setError("");
    setSuccess("");
    if (!form.name || !form.email || !form.password) {
      setError("All feilds are required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), //json.stringify() is used to convert a JavaScript object (in this case, the form data) into a JSON string format that can be sent in the body of an HTTP request. This is necessary because the server expects the data to be in JSON format when it receives the request.
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setSuccess("Registered! Please login.");
      setForm({ name: "", email: "", password: "" });
      if (typeof onSwitch === "function") {
        setTimeout(() => onSwitch(), 800);
      } // This block checks if the onSwitch prop is a function and, if so, sets a timeout to call it after 800 milliseconds. This allows the user to see the success message before being redirected to the login page. The onSwitch function is responsible for switching the view from the registration form to the login form in the parent component (App.jsx).
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <InputField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />
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
        {loading ? "Registering..." : "Register"}
      </button>
      <p>
        Already have an account?{" "}
        <span onClick={onSwitch} style={{ color: "blue", cursor: "pointer" }}>
          Login
        </span>
      </p>
    </div>
  );
};

export default Register;
