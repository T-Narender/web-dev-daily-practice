import { useState } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";

const PRODUCTS = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1999,
    image: null,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 2499,
    image: null,
    category: "Fashion",
  },
  {
    id: 3,
    name: "Backpack",
    price: 999,
    image: null,
    category: "Fashion",
  },
  {
    id: 4,
    name: "Desk Lamp",
    price: 599,
    image: null,
    category: "Home",
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    price: 3499,
    image: null,
    category: "Electronics",
  },
  {
    id: 6,
    name: "Water Bottle",
    price: 349,
    image: null,
    category: "Home",
  },
];

function App() {
  const [cart, setCart] = useState([]); // [{ ...product, quantity }]
  const [cartOpen, setCartOpen] = useState(false);
  const [category, setCategory] = useState("All");

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        //already in cart - increment quantity
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      //new item - add with quantity 1
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  function updateQuantity(productId, quantity) {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item,
      ),
    );
  }

  function clearCart() {
    setCart([]);
  }

  // ── DERIVED STATE ────────────────────────────────────────
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const categories = ["All", ...new Set(PRODUCTS.map((p) => p.category))];

  const filteredProducts = PRODUCTS.filter((p) =>
    category === "All" ? true : p.category === category,
  );

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        minHeight: "100vh",
        background: "#f5f5f5",
      }}
    >
      <Navbar
        totalItems={totalItems}
        onCartClick={() => setCartOpen(!cartOpen)}
      />

      {/* Category Filter */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "1rem" }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: "1.5rem",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: "6px 16px",
                borderRadius: 99,
                border: "1px solid #ddd",
                background: category === cat ? "#7F77DD" : "white",
                color: category === cat ? "white" : "#333",
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              inCart={cart.some((item) => item.id === product.id)}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      {cartOpen && (
        <Cart
          cart={cart}
          totalPrice={totalPrice}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onClear={clearCart}
          onClose={() => setCartOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
