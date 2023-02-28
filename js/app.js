"use strict"
const dom = {
   input: document.querySelector("#input"),
   addTaskBtn: document.querySelector(".add__task-btn"),
   task: document.querySelector(".task"),
   checkbox: document.querySelectorAll(".checkbox__"),
   counter: document.querySelector(".counter span"),
}

const newTask = []

dom.addTaskBtn.addEventListener("click", () => {
   if (dom.input.value === "" || checkTask(dom.input)) {
      alert("127192")
      dom.input.value = ""
      return
   }
   newTask.push({
      id: Math.floor(Math.random() * 1000),
      text: dom.input.value,
      checkbox: false,
   })
   dom.input.value = ""
   createTaskHtml(dom.task)
})

function checkTask(input) {
   for (let i = 0; i < newTask.length; i++) {
      return newTask[i].text === input.value ? true : false
   }
}

function createTaskHtml(task) {
   localStorage.setItem("data", JSON.stringify(newTask))
   let htmlList = ''
   newTask.forEach((e) => {
      let line = e.checkbox ? 'line__through' : ""
      let checked = e.checkbox ? "checked" : ""
      htmlList += `
      <div class="task__content">
      <div class="task__item" id="${e.id}">       
      <div class="checkbox"">
      <input class="checkbox__input" id="checkbox-id" type="checkbox" ${checked}>
      <label for="checkbox-id" class="checkbox__label"><p class="${line}" >${e.text}</p></label>
      </div>
      <button class="delete-task"><span class="material-symbols-outlined">close</span></button>
      </div>
      </div>
      `
   })
   task.innerHTML = htmlList
   dom.counter.textContent = newTask.length
   createNotask(dom.task)
}

dom.task.addEventListener("click", (e) => {
   if (e.target.classList.contains("checkbox__label")) {
      createDoneTask(e.target.parentElement.parentNode.id)
      createTaskHtml(dom.task)
      return
   }
   deletTask(e.target.parentNode.parentNode.id, e.target)
   createTaskHtml(dom.task)
})

function createDoneTask(id) {
   newTask.forEach((e) => {
      if (e.id == id) {
         e.checkbox = !e.checkbox
      }
   })
}

function deletTask(id, elem) {
   if (elem.classList.contains("material-symbols-outlined")) {
      newTask.forEach((e, index) => {
         e.id == id && newTask.splice(index, 1)
      })
   }
}

window.addEventListener("DOMContentLoaded", () => {
   localStorage.getItem("data") !== null && newTask.push(...JSON.parse(localStorage.getItem("data")))
   createTaskHtml(dom.task)
})

function createNotask(task) {
   if (newTask.length === 0) {
      task.innerHTML += `
      <div class="no__task">
      <div class="no__task-titel">No task</div>
      </div>`
   }
}










