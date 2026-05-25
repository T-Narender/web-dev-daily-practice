import React from 'react'
import { useState } from "react"



function TodoInput({onAdd}) {

  const [text, setText] = useState("");

  function handleSubmit(){
    if(!text) return 
    onAdd(text)
    setText("")

  }

  return (
    <div>
      <input
        value={text}
        onChange={(e)=>setText(e.target.value)}
        placeholder="Add a todo..."
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  )
}

export default TodoInput
