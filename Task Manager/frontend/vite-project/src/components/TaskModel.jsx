import { useState, useEffect } from "react";

function TaskModal({ task, onSave, onClose }) {
  // If task is passed → edit mode. Else → create mode.
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "todo",
        priority: task.priority || "medium",
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [task]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          zIndex: 200,
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background: "white",
          borderRadius: 12,
          padding: "2rem",
          width: 440,
          zIndex: 300,
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        }}
      >
        <h3 style={{ margin: "0 0 1.5rem", color: "#242626", fontWeight: 700 }}>
          {task ? "Edit Task" : "New Task"}
        </h3>

        <label style={{ color: "#374151", fontWeight: 600 }}>Title *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          style={{
            display: "block",
            width: "100%",
            padding: 8,
            margin: "4px 0 12px",
            boxSizing: "border-box",
            borderRadius: 6,
            border: "1px solid #cbd5e1",
            background: "#f8fafc",
            color: "#1f2937",
          }}
        />

        <label style={{ color: "#374151", fontWeight: 600 }}>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          style={{
            display: "block",
            width: "100%",
            padding: 8,
            margin: "4px 0 12px",
            boxSizing: "border-box",
            borderRadius: 6,
            border: "1px solid #cbd5e1",
            background: "#f8fafc",
            color: "#1f2937",
            resize: "vertical",
          }}
        />

        <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={{ color: "#374151", fontWeight: 600 }}>Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              style={{
                display: "block",
                width: "100%",
                padding: 8,
                marginTop: 4,
                borderRadius: 6,
                border: "1px solid #cbd5e1",
                background: "#f8fafc",
                color: "#1f2937",
              }}
            >
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ color: "#374151", fontWeight: 600 }}>
              Priority
            </label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              style={{
                display: "block",
                width: "100%",
                padding: 8,
                marginTop: 4,
                borderRadius: 6,
                border: "1px solid #cbd5e1",
                background: "#f8fafc",
                color: "#1f2937",
              }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <label style={{ color: "#374151", fontWeight: 600 }}>Due Date</label>
        <input
          name="dueDate"
          type="date"
          value={form.dueDate}
          onChange={handleChange}
          style={{
            display: "block",
            width: "100%",
            padding: 8,
            margin: "4px 0 1.5rem",
            boxSizing: "border-box",
            borderRadius: 6,
            border: "1px solid #cbd5e1",
            background: "#f8fafc",
            color: "#1f2937",
          }}
        />

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => onSave(form)}
            style={{
              flex: 1,
              padding: 10,
              background: "#7F77DD",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {task ? "Update Task" : "Create Task"}
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: 10,
              background: "#f8fafc",
              color: "#111827",
              border: "1px solid #cbd5e1",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default TaskModal;
