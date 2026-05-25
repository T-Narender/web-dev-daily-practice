const express = require("express")
const { nanoid } = require("nanoid")
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.static("public"))

const urlMap = {}

app.post("/shorten", (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({
      error: "url is required"
    })
  }

  const shortId = nanoid(8);

  urlMap[shortId] = url;// store the mapping of shortId to original url

  res.status(201).json({
    shortId: shortId,
    shortUrl: `http://localhost:${PORT}/${shortId}`
  })
})
//redirects to original url
app.get("/:shortId", (req, res) => {
  const { shortId } = req.params
  const originalUrl = urlMap[shortId]; // look up the original URL using the short ID

  if (!originalUrl) {
    return res.status(400).json({
      error: "Short URL not found"
    })
  }

  return res.redirect(originalUrl)
})


// GET /all/urls : see all stored URLs
app.get("/all/urls", (req, res) => {
  res.json(urlMap)
})

// this url shortener works by generating a unique short ID for each original URL and storing the mapping in an in-memory object. When a user accesses the short URL, the server looks up the original URL and redirects the user to it. The /all/urls endpoint allows you to see all stored URLs and their corresponding short IDs.

app.listen(PORT, () => {
  console.log(`URL Shortener running at http://localhost:${PORT}`)
})