import React from "react";
import CartItem from "./CartItem";

const Cart = ({cart, totalPrice, onUpdateQuantity, onRemove, onClose, onClear}) => {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.3)",
          zIndex: 200,
        }}
      />

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: 360,
          height: "100vh",
          background: "white",
          zIndex: 300,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-4px 0 20px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1rem",
            borderBottom: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0 }}>Your Cart</h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
          {cart.length === 0 ? (
            <p
              style={{ color: "#aaa", textAlign: "center", marginTop: "2rem" }}
            >
              Your cart is empty.
            </p>
          ) : (
            cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemove}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: "1rem", borderTop: "1px solid #eee" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              <span>Total</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
            <button
              style={{
                width: "100%",
                padding: "10px",
                background: "#7F77DD",
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              Checkout
            </button>
            <button
              onClick={onClear}
              style={{
                width: "100%",
                padding: "10px",
                background: "white",
                color: "#e74c3c",
                border: "1px solid #e74c3c",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
