// --- DATA ---
// Load notes from localStorage or start with empty array
let notes = JSON.parse(localStorage.getItem("notes")) || [];
/* your code: 
load from localStorage key "notes", parse JSON, fallback to [] */

let editingId = null;



// --- SAVE ---
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
  // your code: JSON.stringify notes → save to localStorage key "notes"
}

// --- ADD ---
function addNote() {
    const text = document.getElementById("noteInput").value.trim()
    if (!text) return
    console.log(editingId);

    if(editingId){
      notes=notes.map(note=>{
        if(note.id===editingId){
          return {...note,text:text}
        }
        return note;
      })
      editingId=null;
    }
    else{
       const note = {
      id: Date.now(),
      text: text,
      createdAt: new Date().toLocaleString()
    }
    // your code: push note to notes array
    notes.push(note)
    }

    saveNotes()
    document.getElementById("noteInput").value = ""
    renderNotes()

}

// --- DELETE ---
function deleteNote(id) {
  // your code: filter out the note with matching id
  notes = notes.filter(note => note.id != id)
  // save + re-render
  saveNotes();
  renderNotes();
}

// DELETE ALL 
function deleteAll() {
  notes = [];
  saveNotes();
  renderNotes();
}
//Edit
function edit(id) {
  const note = notes.find(note => note.id === id);
  document.getElementById("noteInput").value = note.text;
  editingId = id;
}

// --- SEARCH + RENDER ---
function renderNotes() {
  const query = document.getElementById("search").value.toLowerCase()
  const container = document.getElementById("notesContainer")

  const filtered = notes.filter(note => note.text.toLowerCase().includes(query))
  /* your code: filter notes where note.text.toLowerCase() includes query */

  document.getElementById("count").innerText =
   `Total Notes: ${notes.length}`

  if (filtered.length === 0) {
    container.innerHTML = "<p>No notes found.</p>"
    return
  }

  container.innerHTML = filtered.map(note => `
        <div class="note-card">
          <div>
            <p>${note.text}</p>
            <small>${note.createdAt}</small>
          </div>
          <button onclick="deleteNote(${note.id})">Delete</button>
          <button onclick="edit(${note.id})">Edit</button>
        </div>
      `).join("")
}








// --- INIT ---
renderNotes() // call on page load to show saved notes
