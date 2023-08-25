const todoInput = document.querySelector(".todo-text");
const addBtn = document.querySelector(".add-todo");
const remvBtn = document.querySelector("remove-button");
let status = "Todo";
let todoList = document.querySelector(".todo-list");
addBtn.addEventListener("click", (event) => {
  const itemList = todoList.querySelectorAll("li");
  const todoNumber = itemList.length + 1;
  if (todoInput.value === "") {
    event.target.parentElement.querySelector(".warning").style.display =
      "inline-block";
  } else {
    event.target.parentElement.querySelector(".warning").style.display = "none";
    let todoItem = `<li class="todo-item">
<span class="item${todoNumber}">${todoNumber}</span> <span class="item-name">${todoInput.value} </span><span>${status}</span>
<button data-action="edit">Edit</button>
<button data-action="removeItem">Remove</button>
</li> `;
    console.log(todoNumber);
    todoList.innerHTML += todoItem;
    todoInput.value = "";
  }
});

class Element {
  constructor(elem) {
    this.elem = elem;
    this.parent = null;
    this.prevParent = null;
    this.checkEdtFlag = false;
    elem.addEventListener("click", this.onClick.bind(this));
  }

  edit(event) {
    if (this.checkEdtFlag === true) {
      return;
    } else {
      this.checkEdtFlag = true;
      this.parent = event.target.parentElement;
      this.prevParent = this.parent.innerHTML;
      let itemName = this.parent.querySelector(".item-name").innerHTML;
      this.parent.innerHTML = `<div class="edit-value">
 <input class="edit-text" value=${itemName} type="text" placeholder="new name" />
 <button data-action="editTodo" type="button">Edit name</button>
 <button data-action="cancelEdit" type="button">Cancel</button>
 <p class='warning'>No input</p>
</div>`;
    }
  }

  editTodo(event) {
    this.parent = event.target.parentElement;
    const editText = this.parent.querySelector(".edit-text");
    if (editText.value === "") {
      this.parent.querySelector(".warning").style.display = "block";
    } else {
      this.parent.querySelector(".warning").style.display = "none";
      this.parent = this.parent.parentElement;
      console.log(this.prevParent);
      this.parent.innerHTML = this.prevParent;
      this.parent.querySelector(".item-name").innerHTML = editText.value;
      this.checkEdtFlag = false;
    }
  }

  cancelEdit(event) {
    console.log(event);
    this.parent.innerHTML = this.prevParent;
    this.checkEdtFlag = false;
  }

  removeItem(event) {
    this.parent = event.target.parentElement;
    this.parent.remove();
    this.updateItem(event);
  }

  updateItem(event) {
    let itemList = document.querySelectorAll(".todo-list li");
    console.log(itemList);
    itemList.forEach((item, i) => {
      const fixedIndex = i + 1;
      item.firstChild.nextSibling.innerHTML = fixedIndex;
    });
  }

  onClick(event) {
    let action = event.target.dataset.action;
    if (action) {
      this[action](event);
    }
  }
}

new Element(todoList);
