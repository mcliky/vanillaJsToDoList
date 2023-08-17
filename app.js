const todoInput = document.querySelector(".todo-text");
const addBtn = document.querySelector(".add-todo");
const remvBtn = document.querySelector("remove-button");
let number = 1;
let itemName = "Item 2";
let status = "Todo";
let todoList = document.querySelector(".todo-list");
let parent;
let prevParent;

addBtn.addEventListener("click", () => {
  let todoItem = `<li class="todo-item">
<span>${number}</span> <span>${todoInput.value} </span><span>${status}</span>
<button data-action="edit">Edit</button>
<button data-action="remove">Remove</button>
</li> `;
  number += 1;
  todoList.innerHTML += todoItem;
  todoInput.value = "";
});

class Element {
  constructor(elem) {
    elem.onclick = this.onClick.bind(this);
  }

  edit(event) {
    parent = event.target.parentElement;
    prevParent = parent.innerHTML;
    parent.innerHTML = `<div class="edit-value">
 <input class="edit-text" type="text" placeholder="new name" />
 <button data-action="editTodo" type="button">Edit name</button>
 <button data-action="cancelEdit" type="button">Cancel</button>
</div>`;
  }

  editTodo(event) {
    number -= 1;
    parent.innerHTML = `<span>${number}</span> <span>${
      parent.querySelector(".edit-text").value
    } </span><span>${status}</span>
   <button class="edit-button">Edit</button>
   <button class="remove-button">Remove</button>
  `;
  }

  cancelEdit(event) {
    parent.innerHTML = prevParent;
  }

  remove(event) {
    event.target.parentElement.remove();
    number -= 1;
  }

  onClick(event) {
    let action = event.target.dataset.action;
    if (action) {
      this[action](event);
    }
  }
}
new Element(todoList);
