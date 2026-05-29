import React from "react";

const Navbar = ({ totalItems, onCartClick }) => {
  return (
    <div
      style={{
        background: "#7F77DD",
        color: "white",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <h2 style={{ margin: 0, fontSize: 18 }}>🛒 ShopEasy</h2>
      <button
        onClick={onCartClick}
        style={{
          background: "white",
          color: "#7F77DD",
          border: "none",
          borderRadius: 8,
          padding: "8px 16px",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Cart {totalItems > 0 && `(${totalItems})`}
      </button>
    </div>
  );
};

export default Navbar;
