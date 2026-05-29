import React from "react";

const ProductCard = ({ product, inCart, onAddToCart }) => {
  const fallbackImage = (label) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ece9ff"/><stop offset="100%" stop-color="#d7e9ff"/></linearGradient></defs><rect width="400" height="300" fill="url(#g)"/><text x="200" y="155" text-anchor="middle" font-size="24" font-family="Arial, sans-serif" fill="#3a3a4a">${label}</text></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  return (
    <div
      style={{
        background: "white",
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
      }}
    >
      <img
        src={product.image || fallbackImage(product.name)}
        alt={product.name}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = fallbackImage(product.name);
        }}
        style={{ width: "100%", height: 160, objectFit: "cover" }}
      />
      <div style={{ padding: "12px" }}>
        <p style={{ margin: "0 0 4px", fontWeight: 500, fontSize: 14 }}>
          {product.name}
        </p>
        <p style={{ margin: "0 0 10px", color: "#7F77DD", fontWeight: 600 }}>
          ₹{product.price}
        </p>
        <button
          onClick={() => onAddToCart(product)}
          style={{
            width: "100%",
            padding: "8px",
            background: inCart ? "#e8f5e9" : "#7F77DD",
            color: inCart ? "#27ae60" : "white",
            border: inCart ? "1px solid #27ae60" : "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          {inCart ? "✓ Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
