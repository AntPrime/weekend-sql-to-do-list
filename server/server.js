const express = require('express');
const app = express();
const todos = require('./routes/todos.router.js');

let PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.static('./server/public'));

// Do not modify this!
if (process.env.NODE_ENV == 'test') {
  PORT = 5002;
}
const toDoList = [{
  text: "TEXT",
  isComplete: Boolean
}]



app.use('/todos', todos);

//Creating route to GET
app.get('/todos', (req, res) => {
  console.log(`In /todos GET`);
  res.send(toDoList);
});
// creating route to POST 
app.post('/todos', (req, res) => {
  console.log(`In /todo's POST with`, req.body);
  toDoList.push(req.body);
  res.sendStatus(201);
});


app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});
