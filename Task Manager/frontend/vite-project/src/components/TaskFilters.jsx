function TaskFilters({ filters, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        marginBottom: "1rem",
      }}
    >
      <input
        placeholder="Search tasks..."
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
        style={{
          padding: "7px 12px",
          borderRadius: 6,
          border: "1px solid #cbd5e1",
          flex: 1,
          minWidth: 180,
          background: "#f8fafc",
          color: "#1f2937",
        }}
      />

      <select
        value={filters.status}
        onChange={(e) => onChange({ ...filters, status: e.target.value })}
        style={{
          padding: "7px",
          borderRadius: 6,
          border: "1px solid #cbd5e1",
          background: "#f8fafc",
          color: "#1f2937",
        }}
      >
        <option value="">All Status</option>
        <option value="todo">Todo</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>

      <select
        value={filters.priority}
        onChange={(e) => onChange({ ...filters, priority: e.target.value })}
        style={{
          padding: "7px",
          borderRadius: 6,
          border: "1px solid #cbd5e1",
          background: "#f8fafc",
          color: "#1f2937",
        }}
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}

export default TaskFilters;
