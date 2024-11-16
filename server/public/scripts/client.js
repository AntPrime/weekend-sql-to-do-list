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
toDoTableBody.innerHTML += (`
    <tr data-testid="toDoItem">
        <td>${todo.text}</td>
        <td>${todo.isComplete}</td>
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
  isComplete: document.getElementById('submit-todo')
}

}