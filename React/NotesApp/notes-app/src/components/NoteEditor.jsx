import React from 'react'
import { useState } from "react"
import ReactMarkdown from "react-markdown"

const NoteEditor = ({ note , onUpdate}) => {

  const[preview,setPreview] = useState(false)


 return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

      {/* Toolbar */}
      <div style={{ padding: "12px 1rem", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <input
          value={note.title}
          onChange={(e) => onUpdate(note.id, { title: e.target.value })}
          style={{ fontSize: 18, fontWeight: 500, border: "none", outline: "none", width: "60%" }}
          placeholder="Note title..."
        />
        <button
          onClick={() => setPreview(!preview)}
          style={{ padding: "6px 14px", borderRadius: 6, border: "1px solid #ddd", cursor: "pointer" }}
        >
          {preview ? "✏️ Edit" : "👁 Preview"}
        </button>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: "1rem", overflow: "auto" }}>
        {preview
          ? <ReactMarkdown>{note.body}</ReactMarkdown>
          : <textarea
              value={note.body}
              onChange={(e) => onUpdate(note.id, { body: e.target.value })}
              placeholder="Write your note in markdown...&#10;&#10;# Heading&#10;**bold** _italic_&#10;- list item"
              style={{ width: "100%", height: "100%", border: "none", outline: "none", resize: "none", fontSize: 14, lineHeight: 1.6, fontFamily: "monospace", boxSizing: "border-box" }}
            />
        }
      </div>
    </div>
  )
}

export default NoteEditor
