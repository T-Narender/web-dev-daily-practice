const express = require("express")
const Task = require("../models/Task")
const middleware = require("../middleware/auth")
const authMiddleware = require("../middleware/auth")
const router = express.Router()

// All task routes are protected — must have valid JWT
router.use(authMiddleware)

// GET /tasks — get all tasks for logged-in user
// Optional filters: ?status=todo  ?priority=high  ?search=keyword
router.get("/", async (req, res) => {
  try {
    const { status, priority, search } = req.query

    // Always filter by logged-in user
    let filter = { user: req.user.id }

    if (status) filter.status = status
    if (priority) filter.priority = priority
    if (search) {
      filter.title = { $regex: search, $options: "i" } // case-insensitive search
    }

    const tasks = await Task.find(filter).sort({ dueDate: 1, createdAt: -1 })
    res.json(tasks)

  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }
})


// POST /tasks — create a task
router.post("/", async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body

  try {
    const task = await Task.create({
      user: req.user.id,
      title,
      description,
      status,
      priority,
      dueDate
    })
    res.status(201).json(task)
  }
  catch (err) {
    if (err.name === "ValidationError")
      return res.status(400).json({ error: err.message })
    res.status(500).json({ error: err.message })
  }
})

// PUT /tasks/:id — update a task
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      // find by BOTH id AND user — prevents updating someone else's task
      req.body,
      { new: true, runValidators: true }
    )
    if (!task) return res.status(404).json({ error: "Task not found" })
    res.json(task)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE /tasks/:id — delete a task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    })

    if (!task) return res.status(404).json({ error: "Task not found" })
    res.json({ message: "Task deleted", task })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router