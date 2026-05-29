import React from 'react'

const CartItem = ({item, onUpdateQuantity, onRemove}) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>
      <div style={{ flex: 1 }}>
        <p style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 500 }}>
          {item.name}
        </p>
        <p style={{ margin: 0, fontSize: 13, color: "#7F77DD" }}>
          ₹{item.price}
        </p>
      </div>

      {/* Quantity Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          style={{ width: 28, height: 28, border: "1px solid #ddd", borderRadius: 6, cursor: "pointer", background: "white" }}
        >−</button>

        <span style={{ minWidth: 20, textAlign: "center" }}>
          {item.quantity}
        </span>

        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          style={{ width: 28, height: 28, border: "1px solid #ddd", borderRadius: 6, cursor: "pointer", background: "white" }}
        >+</button>

        <button
          onClick={() => onRemove(item.id)}
          style={{ background: "none", border: "none", color: "#e74c3c", cursor: "pointer", fontSize: 16, marginLeft: 4 }}
        >✕</button>
      </div>
    </div>
  )
}

export default CartItem
