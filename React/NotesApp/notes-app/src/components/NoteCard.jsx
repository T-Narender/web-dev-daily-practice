import React from "react";

const NoteCard = ({ note, isSelected, onSelect, onDelete }) => {
  return (
    <div
      onClick={() => onSelect(note.id)}
      style={{
        padding: "12px 1rem",
        borderBottom: "1px solid #f0f0f0",
        cursor: "pointer",
        background: isSelected ? "#EEEDFE" : "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        transition: "background 0.15s",
      }}
    >
      <div style={{ flex: 1, overflow: "hidden" }}>
        <p
          style={{
            margin: 0,
            fontWeight: 500,
            fontSize: 14,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {note.title || "Untitled"}
        </p>
        <p
          style={{
            margin: "3px 0 0",
            fontSize: 12,
            color: "#aaa",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {note.body || "No content..."}
        </p>
        <p style={{ margin: "2px 0 0", fontSize: 11, color: "#ccc" }}>
          {note.updatedAt}
        </p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(note.id);
        }}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#ccc",
          fontSize: 16,
          marginLeft: 8,
          flexShrink: 0,
        }}
      >
        ✕
      </button>
    </div>
  );
};

export default NoteCard;
