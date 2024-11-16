console.log('JS is sourced!');
// calling everything in the  DB to be called when the page loads

getTodos()

function getTodos() { 
    // get artist data from the server
    axios({
      method: 'GET',
      url: '/todos'
    }).then(function(response) {
      console.log('Got artists', response.data);
       renderTodos(response.data);
    }).catch(function (error) {
      console.log('error in artist get', error);
    });
}


function renderTodos( listOfToDos ){
const toDoTableBody = document.getElementById('toDoHome')

toDoTableBody.innerHTML = '';

for (let todo of listOfToDos){
  let completedToDO = 'Complete';
  if( todo.isComplete ){
    completedToDO = 'NOT DONE';
  }
toDoTableBody.innerHTML += (`
    <tr data-testid="toDoItem">
        <td>${todo.text}</td>
        <td><button class="completeMe" data-testid="completeButton" onClick="">${completedToDO}</td>
        <td><button data-testid="deleteButton" onClick="deleteToDo(${todo.id})">DELETE</td>
      </tr>
    `)
}
}

function addTodo(event) {
event.preventDefault();
console.log("Submit button pressed")
// Get info to send to the server
const toDoToSend = {
  text: document.getElementById('toDo').value,
  isComplete: false
}
console.log("adding to-do item", toDoToSend)
document.getElementById('toDo').value = ''
axios({
  method: 'POST',
  url: '/todos',
  data: toDoToSend
}).then(function(response) {
  console.log(response.data);
  getTodos();
}).catch(function(error) {
  console.log('error in todos post', error); 
  alert('Error adding todo. Please try again later.')       
});
}

function deleteToDo( id ){
  console.log("delete button pressed")
  const deletedId = {
    id: id
  };

  // connecting the delete function to the router/DB
  axios({
    method: 'DELETE',
    url: '/todos',
    data: deletedId
  }).then(function(response) {
    console.log(response.data);
    getTodos();
  }).catch(function(error) {
    console.log('error in to-do delete', error); 
    alert('Error deleting todo item. Please try again later.')       
  });
}

