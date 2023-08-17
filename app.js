const todoInput = document.querySelector(".todo-text");
const addBtn = document.querySelector(".add-todo");
const remvBtn = document.querySelector("remove-button");
let number = 1;
let itemName = "Item 2";
let status = "Todo";
let todoList = document.querySelector(".todo-list");

addBtn.addEventListener("click", (event) => {
  if (todoInput.value === "") {
    event.target.parentElement.querySelector(".warning").style.display =
      "inline-block";
  } else {
    event.target.parentElement.querySelector(".warning").style.display = "none";
    let todoItem = `<li class="todo-item">
<span>${number}</span> <span>${todoInput.value} </span><span>${status}</span>
<button data-action="edit">Edit</button>
<button data-action="remove">Remove</button>
</li> `;
    number += 1;
    todoList.innerHTML += todoItem;
    todoInput.value = "";
  }
});

class Element {
  constructor(elem) {
    this.elem = elem; // Store the element

    elem.addEventListener("click", this.onClick.bind(this));
  }

  edit(event) {
    let parent = event.target.parentElement;
    this.prevParent = parent.innerHTML; // Store the previous content
    parent.innerHTML = `<div class="edit-value">
 <input class="edit-text" type="text" placeholder="new name" />
 <button data-action="editTodo" type="button">Edit name</button>
 <button data-action="cancelEdit" type="button">Cancel</button>
</div>
<p class='warning'>No input</p>`;
  }

  editTodo(event) {
    let parent = event.target.parentElement;
    if (parent.querySelector(".edit-text").value === "") {
      parent.querySelector(".warning").style.display = "block";
    } else {
      number -= 1;
      parent.innerHTML = `<span>${number}</span> <span>${
        parent.querySelector(".edit-text").value
      } </span><span>${status}</span>
   <button data-action="edit">Edit</button>
   <button data-action="remove">Remove</button>
  `;
    }
  }

  cancelEdit(event) {
    let parent = event.target.parentElement;
    let editValueDiv = parent.querySelector(".edit-value");
    if (editValueDiv) {
      parent.removeChild(editValueDiv);
      parent.innerHTML = this.prevParent;
    }
  }

  remove(event) {
    let parent = event.target.parentElement;
    parent.remove();
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
