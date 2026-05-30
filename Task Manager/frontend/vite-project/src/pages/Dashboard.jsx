import { useState, useEffect } from "react"
import API          from "../api/axios"
import Navbar       from "../components/Navbar"
import TaskCard     from "../components/TaskCard"
import TaskModal    from "../components/TaskModel"
import TaskFilters  from "../components/TaskFilters"

function Dashboard() {
  const [tasks,      setTasks]      = useState([])
  const [loading,    setLoading]    = useState(false)
  const [error,      setError]      = useState("")
  const [modalOpen,  setModalOpen]  = useState(false)
  const [editTask,   setEditTask]   = useState(null) // null = create, task = edit
  const [filters,    setFilters]    = useState({ search: "", status: "", priority: "" })

  // ── FETCH TASKS ──────────────────────────────────────────
  useEffect(() => {
    fetchTasks()
  }, [filters]) // re-fetch when filters change

  async function fetchTasks() {
    setLoading(true)
    setError("")
    try {
      // Build query string from filters
      const params = new URLSearchParams()
      if (filters.search)   params.append("search",   filters.search)
      if (filters.status)   params.append("status",   filters.status)
      if (filters.priority) params.append("priority", filters.priority)

      const res = await API.get(`/tasks?${params.toString()}`) //this will call backend with query params like: /tasks?search=keyword&status=todo
      setTasks(res.data)
    } catch (err) {
      setError("Failed to load tasks")
    } finally {
      setLoading(false)
    }
  }

  // ── CREATE / UPDATE ──────────────────────────────────────
  async function handleSave(formData) {
    try {
      if (editTask) {
        // Update existing task
        await API.put(`/tasks/${editTask._id}`, formData) //this will call backend to update task with id: editTask._id
      } else {
        // Create new task
        await API.post(`/tasks`, formData)
      }
      setModalOpen(false)
      setEditTask(null)
      fetchTasks()
    } catch (err) {
      alert(err.response?.data?.error || "Failed to save task")
    }
  }

  // ── DELETE ───────────────────────────────────────────────
  async function handleDelete(taskId) {
    if (!window.confirm("Delete this task?")) return
    try {
      await API.delete(`/tasks/${taskId}`)
      fetchTasks()
    } catch (err) {
      alert("Failed to delete task")
    }
  }

  // ── STATUS CHANGE (click badge to cycle) ─────────────────
  async function handleStatusChange(taskId, newStatus) {
    try {
      await API.put(`/tasks/${taskId}`, { status: newStatus }) //this will call backend to update task status
      fetchTasks()
    } catch (err) {
      alert("Failed to update status")
    }
  }

  // ── GROUP BY STATUS ──────────────────────────────────────
  const grouped = {
    todo:  tasks.filter(t => t.status === "todo"),
    doing: tasks.filter(t => t.status === "doing"),
    done:  tasks.filter(t => t.status === "done" )
  }

  const COLUMN_LABELS = { todo: "📋 Todo", doing: "⚡ Doing", done: "✅ Done" }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Navbar />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "1.5rem" }}>

        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2 style={{ margin: 0 }}>My Tasks</h2>
          <button
            onClick={() => { setEditTask(null); setModalOpen(true) }}
            style={{ padding: "8px 20px", background: "#7F77DD", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}
          >
            + New Task
          </button>
        </div>

        <TaskFilters filters={filters} onChange={setFilters} />

        {error   && <p style={{ color: "red" }}>{error}</p>}
        {loading && <p style={{ color: "#aaa" }}>Loading tasks...</p>}

        {/* Kanban columns */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
          {Object.entries(grouped).map(([status, columnTasks]) => (
            <div key={status}
              style={{ background: "white", borderRadius: 10, padding: "1rem", minHeight: 300, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <h3 style={{ margin: "0 0 1rem", fontSize: 14 }}>
                {COLUMN_LABELS[status]}
                <span style={{ color: "#aaa", fontWeight: 400, marginLeft: 6 }}>({columnTasks.length})</span>
              </h3>
              {columnTasks.map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={(t) => { setEditTask(t); setModalOpen(true) }}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {modalOpen && (
        <TaskModal
          task={editTask}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); setEditTask(null) }}
        />
      )}
    </div>
  )
}

export default Dashboard