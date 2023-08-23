const todoInput = document.querySelector(".todo-text");
const addBtn = document.querySelector(".add-todo");
const remvBtn = document.querySelector("remove-button");
let number = 1;
let itemName = "Item 2";
let status = "Todo";
let todoList = document.querySelector(".todo-list");
let checkEdtFlag = false;

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
    this.elem = elem;
    this.parent;
    this.prevParent;

    elem.addEventListener("click", this.onClick.bind(this));
  }

  edit(event) {
    if (checkEdtFlag === true) {
      return;
    } else {
      checkEdtFlag = true;
      this.parent = event.target.parentElement;
      this.prevParent = this.parent.innerHTML;
      this.parent.innerHTML = `<div class="edit-value">
 <input class="edit-text" type="text" placeholder="new name" />
 <button data-action="editTodo" type="button">Edit name</button>
 <button data-action="cancelEdit" type="button">Cancel</button>
 <p class='warning'>No input</p>
</div>`;
    }
  }

  editTodo(event) {
    console.log(this.parent);
    this.parent = event.target.parentElement;
    const editText = this.parent.querySelector(".edit-text");
    console.log(this.parent);
    if (editText.value === "") {
      this.parent.querySelector(".warning").style.display = "block";
    } else {
      this.parent.querySelector(".warning").style.display = "none";
      this.parent.parentElement.innerHTML = `<span>${number}</span> <span>${editText.value} </span><span>${status}</span>
   <button data-action="edit">Edit</button> 
   <button data-action="remove">Remove</button>
  `;
      checkEdtFlag = false;
    }
  }

  cancelEdit(event) {
    console.log(event);
    this.parent.innerHTML = this.prevParent;
    checkEdtFlag = false;
  }

  remove(event) {
    this.parent = event.target.parentElement;
    this.parent.remove();
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
