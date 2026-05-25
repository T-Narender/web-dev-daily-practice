const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // middleware

let todos = []
let nextId = 1

//get
app.get("/todos",(req,res)=>{
  res.json(todos);
})

//post
app.post("/todos",(req,res)=>{
  const {text}=req.body;
  if(!text){
    return res.status(400).json({
      error: "text is required"
    })  
  }
  const todo={
    id:nextId++,
    text,
    completed:false

  };
  todos.push(todo);
  // send response
  res.status(201).json(todo)
})

//delete
app.delete("/todos/:id",(req,res)=>{
  const id = Number(req.params.id);
  const index=todos.findIndex(todo=> todo.id===id);
  if(index==-1){
    res.status(404).json({
      error:"Todo not found"
    })
  }
   // remove todo
  todos.splice(index, 1)
  // success response
  res.status(200).json({
    message: "Deleted successfully"
  })
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})