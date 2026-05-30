const STATUS_COLORS = { todo: "#FAC775", doing: "#85B7EB", done: "#9FE1CB" };
const PRIORITY_COLORS = { low: "#aaa", medium: "#e67e22", high: "#e74c3c" };

function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <div
      style={{
        background: "white",
        border: "1px solid #eee",
        borderRadius: 10,
        padding: "1rem",
        marginBottom: 10,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 6,
        }}
      >
        <h4
          style={{ margin: 0, fontSize: 15, color: "#111827", fontWeight: 700 }}
        >
          {task.title}
        </h4>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={() => onEdit(task)}
            style={{
              background: "#eef2ff",
              color: "#1e1b4b",
              border: "1px solid #c7d2fe",
              borderRadius: 6,
              padding: "3px 10px",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            style={{
              background: "none",
              border: "1px solid #fcc",
              borderRadius: 6,
              padding: "3px 10px",
              cursor: "pointer",
              fontSize: 12,
              color: "#e74c3c",
            }}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p style={{ margin: "0 0 8px", fontSize: 13, color: "#666" }}>
          {task.description}
        </p>
      )}

      {/* Meta row */}
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Status badge — click to cycle */}
        <span
          onClick={() => {
            const next = { todo: "doing", doing: "done", done: "todo" };
            onStatusChange(task._id, next[task.status]);
          }}
          style={{
            fontSize: 11,
            padding: "2px 10px",
            borderRadius: 99,
            cursor: "pointer",
            background: STATUS_COLORS[task.status] + "33",
            border: `1px solid ${STATUS_COLORS[task.status]}`,
          }}
        >
          {task.status}
        </span>

        {/* Priority badge */}
        <span style={{ fontSize: 11, color: PRIORITY_COLORS[task.priority] }}>
          ● {task.priority}
        </span>

        {/* Due date */}
        {task.dueDate && (
          <span style={{ fontSize: 11, color: "#aaa", marginLeft: "auto" }}>
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
