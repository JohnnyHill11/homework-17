'use strict';

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos/'
const CHECKED_CLASS = 'checked';
const DELETE_BUTTON_CLASS = 'delete-button';
const LIST_ITEM_CLASS = 'list-item';
const LIST_ITEM_SELECTOR = '.' + LIST_ITEM_CLASS;

const input = document.querySelector('#input');
const listItemTemplate = document.querySelector('#list-item-template').innerHTML;
const listEl = document.querySelector('#list-id');
let todoList = [];

listEl.addEventListener('click', onListClick);

init();

function init(){
  fetchTodos();
}

function onListClick(event) {
  const todoEl = getTaskElement(event.target);

  switch (true) {
    case event.target.classList.contains(DELETE_BUTTON_CLASS):
      return deleteTodo(+todoEl.dataset.id);
    case event.target.classList.contains(LIST_ITEM_CLASS):
      return toggleTodo(+todoEl.dataset.id);
  }
}

function getTaskElement(el) {
  return el.closest(LIST_ITEM_SELECTOR);
}

function fetchTodos() {
  fetch(TODOS_URL)
  .then(response => response.json())
  .then(setTodos)
  .then(renderTodos);
}

function setTodos(list) {
  return  todoList = list
}

function renderTodos(list) {
  const html = list.map(getTodoHtml).join('');
  listEl.innerHTML = html;
}

function getTodoHtml(todo) {
  return listItemTemplate
    .replace('{{checkedClass}}', todo.completed ? CHECKED_CLASS : '')
    .replace('{{text}}', todo.title)
    .replace('{{id}}', todo.id);
}

function toggleTodo(todoId) {
  const todo = todoList.find((todo) => todo.id === todoId);
  todo.completed = !todo.completed;
  renderTodos(todoList);
}

function deleteTodo(todoId) {
  const index = todoList.findIndex((index) => index.id === todoId);
  if (index !== -1) {
    todoList.splice(index, 1);
  }
  todoList.splice(index, 1);
  renderTodos(todoList);
}