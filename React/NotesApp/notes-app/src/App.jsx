import { useEffect, useState } from "react";
import NoteList from "./components/NoteList";
import NoteEditor from "./components/NoteEditor";

function normalizeNote(note) {
  if (!note || typeof note !== "object") {
    return null;
  }

  return {
    id: note.id ?? Date.now(),
    title: typeof note.title === "string" ? note.title : "",
    body: typeof note.body === "string" ? note.body : "",
    updatedAt:
      typeof note.updatedAt === "string"
        ? note.updatedAt
        : new Date().toLocaleString(),
  };
}

function loadNotes() {
  const saved = localStorage.getItem("notes");

  if (!saved) {
    return [];
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed)
      ? parsed.map(normalizeNote).filter(Boolean)
      : [];
  } catch {
    return [];
  }
}

function App() {
  const [notes, setNotes] = useState(() => {
    // Lazy init — load from localStorage on first render only
    return loadNotes();
  });

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  // Persist to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNote() {
    const newNote = {
      id: Date.now(),
      title: "Untitled Note",
      body: "",
      updatedAt: new Date().toLocaleString(),
    };
    setNotes([newNote, ...notes]);
    setSelected(newNote.id);
  }

  const updateNote = (id, changes) => {
    setNotes(
      notes.map((n) =>
        n.id === id
          ? { ...n, ...changes, updatedAt: new Date().toLocaleString() }
          : n,
      ),
    );
  };

  function deleteNote(id) {
    setNotes(notes.filter((n) => n.id !== id));
    if (selected === id) setSelected(null);
  }

  const filteredNotes = notes.filter(
    (n) =>
      (n.title ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (n.body ?? "").toLowerCase().includes(search.toLowerCase()),
  );

  const activeNote = notes.find((n) => n.id === selected);

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      {/* Sidebar */}
      <div
        style={{
          width: 280,
          borderRight: "1px solid #eee",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "1rem", borderBottom: "1px solid #eee" }}>
          <h2 style={{ margin: "0 0 10px" }}>Notes</h2>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes..."
            style={{
              width: "100%",
              padding: "7px",
              boxSizing: "border-box",
              borderRadius: 6,
              border: "1px solid #ddd",
            }}
          />
          <button
            onClick={addNote}
            style={{
              width: "100%",
              marginTop: 8,
              padding: "8px",
              background: "#7F77DD",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            + New Note
          </button>
        </div>

        <NoteList
          notes={filteredNotes}
          selectedId={selected}
          onSelect={setSelected}
          onDelete={deleteNote}
        />
      </div>

      {/* Editor */}
      <div style={{ flex: 1 }}>
        {activeNote ? (
          <NoteEditor note={activeNote} onUpdate={updateNote} />
        ) : (
          <div style={{ padding: "3rem", color: "#aaa", textAlign: "center" }}>
            Select a note or create one
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
