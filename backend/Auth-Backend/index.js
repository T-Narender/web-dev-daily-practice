const express = require('express');
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const cors = require("cors");
const port = 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// Middleware to parse JSON bodies
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const JWT_SECRET = process.env.JWT_SECRET;

// ─── MIDDLEWARE: protect routes 

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"]


  //token come as Bearer <token>
  // so we split by space and take the second part as the token
  //Bearer token is a common convention for sending JWT in the Authorization header
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "No token provided" })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded //attach user playload to request object
    next()
  }
  catch (err) {
    res.status(403).json({ error: "Invalid or expired token" })
  }
}



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
    redirectTo: "/login",
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

  // Generate JWT — expires in 1 hour
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  )

  // 4. Login success — return user (no password)
  res.json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  })
})

 //PROTECTED ROUTE 
// GET /profile — only accessible with valid token

app.get("/profile", authMiddleware, (req,res) => {
  res.json({
    message: "This is your profile",
    user: req.user
  })
})

// ─── PROTECTED ROUTE 
// GET /users — only accessible with valid token
app.get("/users", authMiddleware, (req, res) => {
  // Return users WITHOUT password field
  const safeUsers = users.map(({ password, ...rest }) => rest)
  res.json(safeUsers)
})










app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});