import React from "react";
import NoteCard from "./NoteCard";

const NoteList = ({ notes, selectedId, onSelect, onDelete }) => {
  if (notes.length == 0) {
    return <p style={{ padding: "1rem", color: "#aaa" }}>No notes found.</p>;
  }

  return (
    <div style={{ overflowY: "auto", flex: 1 }}>
      {notes.map((note) => (
        <div
          key={note.id}
          onClick={() => onSelect(note.id)}
          style={{
            padding: "12px 1rem",
            borderBottom: "1px solid #f0f0f0",
            cursor: "pointer",
            background: selectedId === note.id ? "#EEEDFE" : "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <NoteCard
            note={note}
            isSelected={selectedId === note.id}
            onSelect={onSelect}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default NoteList;
