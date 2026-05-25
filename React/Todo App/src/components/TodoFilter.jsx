import React from 'react'

// This component renders the filter buttons and calls onChange with the new filter when a button is clicked
const TodoFilter = ({current,onChange}) => {
  return (
    <div style={{ margin: "12px 0" }}>
      {["all", "completed", "pending"].map(f => (
        <button
          key={f}
          onClick={() => onChange(f)}
          style={{ marginRight: 8, fontWeight: current === f ? "bold" : "normal" }}
        >
          {f}
        </button>
      ))}
    </div>
  )
}

export default TodoFilter
