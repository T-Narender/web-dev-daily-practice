const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("DB error", err))


//ROUTES
app.use("/auth", require("./routes/auth"))
app.use("/tasks", require("./routes/task"))

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))