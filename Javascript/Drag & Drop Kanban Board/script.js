let state = JSON.parse(localStorage.getItem("kanban")) || {
  todo: { title: "📋 Todo", cards: [] },
  doing: { title: "⚡ Doing", cards: [] },
  done: { title: "✅ Done", cards: [] }
}

let draggedCard = null
let draggedId = null
let draggedColumn = null

//save
function saveState() {
  localStorage.setItem("kanban", JSON.stringify(state))
}

//Add
function addCard(columnId) {
  const input = document.getElementById(`input-${columnId}`)
  const text = input.value.trim()
  if (!text) return

  const card = {
    id: Date.now(),
    text: text
  }

  //push card to state[columnId].cards
  state[columnId].cards.push(card)
  saveState()
  input.value = ""
  render()

}

//Delete Card
function deleteCard(columnId, cardId) {
  state[columnId].cards = state[columnId].cards.filter(c => c.id !== cardId)
  saveState()
  render()

}

//  DRAG EVENTS
function onDragStart(e, columnId, cardId) {
  draggedId = cardId
  draggedColumn = columnId

  // Add dragging class after a tiny delay so the card renders before fading
  setTimeout(() => e.target.classList.add("dragging"), 0) //this helps with the dragging effect, making the card semi-transparent while being dragged. 
}

function onDragEnd(e) {
  e.target.classList.remove("dragging")
}

function onDragOver(e) {
  e.preventDefault() // allows drop
  e.currentTarget.classList.add("drag-over")
}

function onDragLeave(e) {
  e.currentTarget.classList.remove("drag-over")
}

function onDrop(e, targetColumnId) {
  e.currentTarget.classList.remove("drag-over")

  if (draggedColumn === targetColumnId) return // dropped in same column

  // Find the card in the source column
  const card = state[draggedColumn].cards.find(
    c => c.id === draggedId
  )
  if (!card) return

  // Remove from source column
  state[draggedColumn].cards = state[draggedColumn].cards.filter(
    c => c.id !== draggedId
  )

  // Add to target column
  state[targetColumnId].cards.push(card)

  saveState()
  render()
}

//Render

function render() {
  const board = document.getElementById("board")

  board.innerHTML = Object.entries(state).map(([columnId, column]) => `
        <div
          class="column"
          ondragover="onDragOver(event)"
          ondragleave="onDragLeave(event)"
          ondrop="onDrop(event, '${columnId}')"
        >
          <h3>${column.title} <span style="color:#aaa;font-size:12px">(${column.cards.length})</span></h3>

          ${column.cards.map(card => `
            <div
              class="card"
              draggable="true"
              ondragstart="onDragStart(event, '${columnId}', ${card.id})"
              ondragend="onDragEnd(event)"
            >
              <span>${card.text}</span>
              <button class="delete-btn" onclick="deleteCard('${columnId}', ${card.id})">✕</button>
            </div>
          `).join("")}

          <div class="add-area">
            <input
              id="input-${columnId}"
              placeholder="Add a card..."
              onkeydown="if(event.key==='Enter') addCard('${columnId}')"
            />
            <button onclick="addCard('${columnId}')">+ Add</button>
          </div>
        </div>
      `).join("")
}

// Init
render()