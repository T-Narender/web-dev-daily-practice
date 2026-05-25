import { useState } from "react"
import TodoInput from "./components/TodoInput"
import TodoItem from "./components/TodoItem"
import TodoFilter from "./components/TodoFilter"

function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState("all") // "all" | "completed" | "pending"

  function addTodo(text) { 
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    }
    // your code: add to todos array using setTodos
    setTodos([...todos,newTodo])
  }

  function toggleComplete(id) {
    // your code: map over todos, flip completed for matching id
      const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }

      return todo
    })
    // setTodos(...)
    setTodos(updatedTodos)
  }

  function deleteTodo(id) {
    // your code: filter out todo with matching id
    const updatedTodos = todos.filter(todo => todo.id!==id)
    // setTodos(...)
    setTodos(updatedTodos)
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === "completed") return todo.completed
    if (filter === "pending") return !todo.completed
    return true
  })

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: "0 1rem" }}>
      <h2>Todo App</h2>
      <TodoInput onAdd={addTodo} />
      <TodoFilter current={filter} onChange={setFilter} />
      {filteredTodos.length === 0 && <p>No todos here.</p>}
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={toggleComplete}
          onDelete={deleteTodo}
        />
      ))}
    </div>
  )
}

export default App