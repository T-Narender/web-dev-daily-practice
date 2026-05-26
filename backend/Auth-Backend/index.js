const express = require('express');
const app = express();
const bcrypt = require("bcryptjs");
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory user store
// Each user: { id, name, email, password (hashed) }
const users = []
let nextId = 1

//Register


app.post("/register", async (req, res) => {
  const { name, email, password } = req.body || {};

  // 1) validate all fields
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" })
  }

  // 2) chekc if email already exists
  const existingUser = users.find(u => u.email === email)

  if (existingUser) {
    return res.status(409).json({ error: "Email already existed" })
  }

  //3) hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //4) create user object
  const user = {
    id: nextId++,
    name,
    email,
    password: hashedPassword
  }


  // 5. Save + respond (never send password back)
  users.push(user);
  res.status(200).json({
    message: "user registered successfully",
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  })
})

//Login

app.post("/login", async (req, res) => {
  const { email, password } = req.body || {};

  // 1. Validate
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" })
  }

  //2. Find user
  const user = users.find(u => u.email === email)

  if (!user) {
    return res.status(404).json({ error: "User not found" })
  }


  // 3. Compare password with hashed password
  const isMatch = await bcrypt.compare(password, user.password)


  if (!isMatch) {
    return res.status(401).json({ error: "Invalid password" })
  }

  // 4. Login success — return user (no password)
  res.json({
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  })
})



// ─── GET ALL USERS (dev helper) ──────────────────────────
// GET /users — see all registered users (for testing only)
app.get("/users", (req, res) => {
  // Return users WITHOUT password field
  const safeUsers = users.map(({ password, ...rest }) => rest)
  res.json(safeUsers)
})










app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});