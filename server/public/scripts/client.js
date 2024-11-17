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
  let completedToDO = 'NOT DONE'
  let buttonClass = 'red'
  if( todo.isComplete ){
    completedToDO = 'Complete'
    buttonClass = 'green'
  }
toDoTableBody.innerHTML += (`
    <tr  data-testid="toDoItem">
        <td>${todo.text}</td>
        <td class="completed"><button 
        data-testid="completeButton" 
        data-id="${todo.id}"
        class="${buttonClass}"
        onClick="updateStatus(${todo.id},${todo.isComplete})">${completedToDO}</button></td>
        <td><button data-testid="deleteButton" onClick="deleteToDo(${todo.id})">DELETE</button></td>
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

function updateStatus( id , status ){
console.log("in update to-do Status")
let button = document.getElementById(`[id="completeButton"]`)
console.log(button)
if (button.textContent === "Complete") {
// If it's "Complete", change it to "NOT DONE" and set color to red
  button.textContent = "NOT DONE"
  button.classList.remove('green') 
  button.classList.add('red')  
// Set status to false 
  status = false 
} else {
// If it's "NOT DONE", change it to "Complete" and set color to green
  button.textContent = "Complete"
  button.classList.remove('red')
  button.classList.add('green')
// Set status to true 
  status = true; 
}
const toDoToSend = {
  id: id,
  newStatus: status
};
// Send the new artist to the server as data
axios({
  method: 'PUT',
  url: '/todos',
  data: toDoToSend
}).then(function(response) {
  console.log(response.data);
  getTodos();
}).catch(function(error) {
  console.log('error in to-do update', error); 
  alert('Error updating to-do. Please try again later.')       
});
}
