const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { error } = require('console');
const { url } = require('inspector');
const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded files as static — access via /uploads/filename.jpg
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

//Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`
    cb(null, uniqueName)
  }
})

const fileFilter = (req, file, cb) => {
  // Only allow images: jpeg, jpg, png, gif, webp
  const allowed = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
  if (allowed.includes(file.mimetype)) {
    cb(null, true)  // accept file
  } else {
    cb(new Error("Only image files allowed"), false) // reject file
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
})

//Routes 
// post/upload : upload single image
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" })
  }
  res.status(201).json({
    message: "File uploaded successfully!",
    filename: req.file.filename,
    url: `http://localhost:${PORT}/uploads/${req.file.filename}`,
    size: req.file.size,
    mimetype: req.file.mimetype
  })
})

// get/files - list all uploaded files
app.get("/files", (req, res) => {
  const uploadsDir = path.join(__dirname, "uploads")
  fs.readdir(uploadsDir, (err, files) => {
    if (err) return res.status(500).json({ error: "Could not read uploads folder" })
    const fileList = files.map(filename => ({
      filename,
      url: `http://localhost:${PORT}/uploads/${filename}`
    }))

    res.json(fileList)
  })
})

// GET /files/:filename — get info about a specific file
app.get("/files/:filename", (req, res) => {
  const filepath = path.join(__dirname, "uploads", req.params.filename)

  // Check if file exists
  if (!fs.existsSync(filepath)) {
    return res.status(404).json({ error: "File not found" })
  }
  const stats = fs.statSync(filepath)
  res.json({
    filename: req.params.filename,
    url: `http://localhost:${PORT}/uploads/${req.params.filename}`,
    size: stats.size,
    created: stats.birthtime
  })

})

// DELETE /files/:filename — delete an uploaded file
app.delete("/files/:filename", (req, res) => {
  const filepath = path.join(__dirname, "uploads", req.params.filename)

  if (!fs.existsSync(filepath)) {
    return res.status(404).json({ error: "File not found" })
  }

  fs.unlink(filepath, (err) => {
    if (err) return res.status(500).json({ error: "Could not delete file" })
    res.json({ message: "File deleted successfully" })
  })
})


// ERROR HANDLER for multer 
app.use((err, req, res, next) => {
  if (err.message === "Only image files allowed") {
    return res.status(400).json({ error: err.message })
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ error: "File too large. Max 5MB." })
  }
  res.status(500).json({ error: err.message })
})

app.listen(PORT, () => {
  console.log(`File Upload API running at http://localhost:${PORT}`)
})