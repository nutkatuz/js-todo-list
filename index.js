const todos = [
  'Сделать проектную работу',
  'Полить цветы',
  'Пройти туториал по Реакту',
  'Сделать фронт для своего проекта',
  'Погулять с собакой',
  'Разобраться в замыканиях',
  'Решить задачу на Codewars',
];

const todosListElement = document.querySelector('.todos__list');
const todosFormElement = document.querySelector('.todos__form');
const todosInputElement = todosFormElement.querySelector('.todos__input');
const todosFormSubmitButton = todosFormElement.querySelector('.todos__submit-btn')
const todoTemplateElement = document.querySelector('.todo-template');

let editedTodo = null;

function addTodo(text) {
  const todo = todoTemplateElement.content.cloneNode(true);
  todo.querySelector('.todo__text').textContent = text;
  addTodoListeners(todo);
  todosListElement.prepend(todo);
}

function addTodoListeners(todo) {
  todo.querySelector('.todo__btn_type_delete').addEventListener('click', handleDeleteTodo);
  todo.querySelector('.todo__btn_type_edit').addEventListener('click', handleEditTodo);
  todo.querySelector('.todo__btn_type_duplicate').addEventListener('click', handleDuplicateTodo);
}

function handleDeleteTodo(e) {
  const todo = e.target.closest('.todo');
  todo.remove();
}

function handleEditTodo(e) {
  const todo = e.target.closest('.todo');
  setTodotoForm(todo);
}

function handleDuplicateTodo(e) {
  const todo = e.target.closest('.todo');
  const newTodo = todo.cloneNode(true);
  addTodoListeners(newTodo);
  todo.after(newTodo);
}

function setTodotoForm(todo) {
  editedTodo = todo;
  const text = todo.querySelector('.todo__text').textContent;
  todosInputElement.value = text;
  todosFormSubmitButton.textContent = 'Сохранить';
}

function handleTodoFormSubmit(e) {
  e.preventDefault();
  const text = todosInputElement.value;
  todosInputElement.value = '';
  if (editedTodo) {
    editedTodo.querySelector('.todo__text').textContent = text;
    todosFormSubmitButton.textContent = 'Добавить';
    editedTodo = null;
  } else {
    addTodo(text);
  }
}

todos.forEach(text => addTodo(text));

todosFormElement.addEventListener('submit', handleTodoFormSubmit);
