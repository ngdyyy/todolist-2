const form = document.getElementById('form');
const input = document.getElementById('input');
const addbtn = document.getElementById('addbtn');
const list = document.getElementById('list');

let todos = [];
let editID = null;

function renderTodos() {
  list.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = todo.text;
    if (todo.complete) span.style.color = 'red';

    const donebtn = document.createElement('button');
    donebtn.textContent = 'Done';
    donebtn.onclick = () => toggleComplete(todo.id);

    const editbtn = document.createElement('button');
    editbtn.textContent = 'Edit';
    editbtn.onclick = () => editTodo(todo.id);

    const deletebtn = document.createElement('button');
    deletebtn.textContent = 'Delete';
    deletebtn.onclick = () => deleteTodo(todo.id);

    li.append(span, donebtn, editbtn, deletebtn);
    list.appendChild(li);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const text = input.value.trim();
  if (text === '') return;

  if (editID !== null) {
    const todo = todos.find(t => t.id === editID);
    if (todo) todo.text = text;
    editID = null;
    addbtn.textContent = 'Add';
  } else {
    todos.push({
      id: Date.now(),
      text,
      complete: false
    });
  }

  input.value = '';
  renderTodos();
});

function editTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (!todo) return;
  input.value = todo.text;
  editID = id;
  addbtn.textContent = 'Update';
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  renderTodos();
}

function toggleComplete(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) todo.complete = !todo.complete;
  renderTodos();
}

