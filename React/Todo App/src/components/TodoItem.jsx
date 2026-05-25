import React from 'react'

const TodoItem = ({todo,onToggle,onDelete}) => {
 return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #eee" }}>
      <span
        onClick={() => onToggle(todo.id)}
        style={{ textDecoration: todo.completed ? "line-through" : "none", cursor: "pointer" }}
      >
        {todo.text}
      </span>
      <button onClick={() =>onDelete(todo.id)}>Delete</button>
    </div>
  )
}

export default TodoItem
