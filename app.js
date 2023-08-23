const todoInput = document.querySelector('.todo-text')
const addBtn = document.querySelector('.add-todo')
const remvBtn = document.querySelector('remove-button')
let number = 1
let itemName = 'Item 2'
let status = 'Todo'
let todoList = document.querySelector('.todo-list')
let checkEdtFlag = false

addBtn.addEventListener('click', (event) => {
  if (todoInput.value === '') {
    event.target.parentElement.querySelector('.warning').style.display =
      'inline-block'
  } else {
    event.target.parentElement.querySelector('.warning').style.display = 'none'
    let todoItem = `<li class="todo-item">
<span class="item${number}">${number}</span> <span class="item-name">${todoInput.value} </span><span>${status}</span>
<button data-action="edit">Edit</button>
<button data-action="removeBtn">Remove</button>
</li> `
    number += 1
    todoList.innerHTML += todoItem
    todoInput.value = ''
  }
})

class Element {
  constructor(elem) {
    this.elem = elem
    this.parent
    this.prevParent

    elem.addEventListener('click', this.onClick.bind(this))
  }

  edit(event) {
    if (checkEdtFlag === true) {
      return
    } else {
      checkEdtFlag = true
      this.parent = event.target.parentElement
      this.prevParent = this.parent.innerHTML
      let itemName = this.parent.querySelector('.item-name').innerHTML
      this.parent.innerHTML = `<div class="edit-value">
 <input class="edit-text" value=${itemName} type="text" placeholder="new name" />
 <button data-action="editTodo" type="button">Edit name</button>
 <button data-action="cancelEdit" type="button">Cancel</button>
 <p class='warning'>No input</p>
</div>`
    }
  }

  editTodo(event) {
    this.parent = event.target.parentElement
    const editText = this.parent.querySelector('.edit-text')
    if (editText.value === '') {
      this.parent.querySelector('.warning').style.display = 'block'
    } else {
      this.parent.querySelector('.warning').style.display = 'none'
      this.parent = this.parent.parentElement
      console.log(this.prevParent)
      this.parent.innerHTML = this.prevParent
      this.parent.querySelector('.item-name').innerHTML = editText.value
      checkEdtFlag = false
    }
  }

  cancelEdit(event) {
    console.log(event)
    this.parent.innerHTML = this.prevParent
    checkEdtFlag = false
  }

  removeBtn(event) {
    let grandParent = event.target.parentElement.parentElement
    this.parent = event.target.parentElement
    let length = number
    if (this.parent.querySelector(`.item${number - 1}`)) {
      this.parent.remove()
      number -= 1
    } else {
      let i = 1
      while (i < length) {
        console.log(i)
        if (this.parent.querySelector(`.item${i}`)) {
          if (this.parent.querySelector(`.item${i}`).innerHTML !== 1) {
            number -= 1
          }
          this.parent.remove()
        }
        if (Number(grandParent.querySelector(`.item${i}`).innerHTML) === 1) {
          i += 1
          continue
        } else {
          grandParent.querySelector(`.item${i}`).innerHTML = (
            Number(grandParent.querySelector(`.item${i}`).innerHTML) - 1
          ).toString()
        }
        i += 1
      }
    }
  }

  onClick(event) {
    let action = event.target.dataset.action
    if (action) {
      this[action](event)
    }
  }
}

new Element(todoList)