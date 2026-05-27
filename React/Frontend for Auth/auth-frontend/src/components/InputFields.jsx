function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <label style={{ display: "block", marginBottom: 4 }}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
      />
    </div>
  )
}

export default InputField