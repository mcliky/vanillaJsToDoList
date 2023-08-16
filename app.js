const todoInput = document.querySelector(".todo-text");
const addBtn = document.querySelector(".add-todo");
const remvBtn = document.querySelector("remove-button");
let number = 1;
let itemName = "Item 2";
let status = "Todo";
let todoList = document.querySelector(".todo-list");
addBtn.addEventListener("click", () => {
  let todoItem = `<li class="todo-item">
<span>${number}</span> <span>${todoInput.value} </span><span>${status}</span>
<button class="edit-button">Edit</button>
<button class="remove-button">Remove</button>
</li> `;
  number += 1;
  todoList.innerHTML += todoItem;
  todoInput.value = "";
});

todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-button")) {
    event.target.parentElement.remove();
  } else if (event.target.classList.contains("edit-button")) {
    const parent = event.target.parentElement;
    const prevParent = parent.innerHTML;

    parent.innerHTML = `<div class="edit-value">
      <input class="edit-text" type="text" placeholder="new name" />
      <button class="edit-todo" type="button">Edit name</button>
      <button class="cancel-edit" type="button">Cancel</button>
    </div>`;

    const editValue = parent.querySelector(".edit-value");

    editValue.addEventListener("click", (event) => {
      if (event.target.classList.contains("edit-todo")) {
        parent.innerHTML = `<span>${number}</span> <span>${
          parent.querySelector(".edit-text").value
        } </span><span>${status}</span>
       <button class="edit-button">Edit</button>
       <button class="remove-button">Remove</button>
      `;
      } else if (event.target.classList.contains("cancel-edit")) {
        parent.innerHTML = prevParent;
      }
    });
  }
});
