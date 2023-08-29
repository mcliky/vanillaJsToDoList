const todoInput = document.querySelector(".todo-text");
const addBtn = document.querySelector(".add-todo");
const remvBtn = document.querySelector("remove-button");
const undoBtn = document.querySelector(".undo-button");
let status = "Todo";
let todoList = document.querySelector(".items");
let deletedItems = [];

addBtn.addEventListener("click", (event) => {
  const itemList = todoList.querySelectorAll("tr");
  const todoNumber = itemList.length + 1;
  if (todoInput.value === "") {
    event.target.parentElement.querySelector(".warning").style.display =
      "inline-block";
  } else {
    event.target.parentElement.querySelector(".warning").style.display = "none";
    let todoItem = `<tr>
<th scope="row" class='item${todoNumber}'>${todoNumber}</th>
<td class="item-name">${todoInput.value}</td>
<td></td>
<td></td>
<td>${status}</td>
<td><button data-action="edit">Edit</button></td>
<td><button data-action="removeItem">Remove</button></td>
</tr>`;
    todoList.innerHTML += todoItem;
    todoInput.value = "";
  }
});

undoBtn.addEventListener("click", (event) => {
  todoList.innerHTML += deletedItems.pop().innerHTML;
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
      this.parent = event.target.parentElement.parentElement;
      this.prevParent = this.parent.innerHTML;
      let itemName = this.parent.querySelector(".item-name").innerHTML;

      console.log(itemName);
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
    this.parent = event.target.parentElement.parentElement;
    console.log(this.parent);
    deletedItems.push(this.parent);
    this.parent.remove();
    console.log(deletedItems.length);
    if (deletedItems.length !== 0) {
      undoBtn.style.display = "block";
    }
    this.updateItem(event);
  }

  updateItem() {
    let itemList = document.querySelectorAll(".items tr");
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
