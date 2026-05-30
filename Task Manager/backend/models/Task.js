const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
    //links every task to the user who created it
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true
  },
  description: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ["todo", "doing", "done"],
    default: "todo"
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium"
  },
  dueDate: {
    type: Date,
    default: null
  }
}, { timestamps: true })

module.exports = mongoose.model("Task", taskSchema)