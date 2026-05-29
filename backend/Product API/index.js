const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config() // Load environment variables from .env file

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err))


//Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"]
  },
  category: {
    type: String,
    default: "General"
  },
  stock: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ""
  }
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema)

// GET /products — get all products (with optional category filter)
// Example: GET /products?category=Electronics
app.get("/products", async (req, res) => {
  try {
    const { category } = req.query
    const filter = category ? { category } : {}
    const products = await Product.find(filter).sort({ createdAt: -1 })
    res.json(products)
  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /products/:id — get single product
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ error: "Product not found" })
    res.json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /products — create a product
app.post("/products", async (req, res) => {
  try {
    const { name, price, category, stock, description } = req.body
    const product = new Product({ name, price, category, stock, description })
    const saved = await product.save()
    res.status(201).json(saved)
  }
  catch (err) {
    // Mongoose validation errors
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message })
    }
    res.status(500).json({ error: err.message })
  }
})

// PUT /products/:id — update a product
app.put("/products/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body, { new: true, runValidators: true }
      // new: true       → return updated doc, not old one
      // runValidators   → run schema validation on update too

    )
    if (!updated) return res.status(404).json({ error: "Product not found" })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.delete("/products/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: "Product not found" })
    res.json({ message: "Product deleted", product: deleted })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


app.listen(PORT, () => {
  console.log(`Product API running at http://localhost:${PORT}`)
})