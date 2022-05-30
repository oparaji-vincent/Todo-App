"use strict";

const mode = document.querySelector(".mode");
const wrapper = document.querySelector(".wrapper");
const header = document.querySelector("header");
const main = document.querySelector("main");
const input = document.querySelector(".create");
const todoContainer = document.querySelector(".todoListContainer");
const todoUl = document.querySelector(".todoContainer");
const circle = document.querySelectorAll(".circle");
let todoList = document.querySelectorAll(".todoList");
const todoInfo = document.querySelectorAll(".todoInfo");
const functionDiv = document.querySelector(".functions");
const stateDiv = functionDiv.querySelector(".state");
const functionPara = functionDiv.querySelectorAll("p");
const clearPara = functionDiv.querySelector(".clear");
const cross = document.querySelector(".cross");
const allpara = document.querySelector(".allItems");
const pendingpara = document.querySelector(".pending");
const completedpara = document.querySelector(".completed");
const length = document.querySelector(".length");
const clear = document.querySelector(".clear");

class App {
  constructor() {
    this.md = ["sun", "moon"];
    this.length = todoList.length;
    console.log(this.length);

    mode.addEventListener("click", this.changeMode.bind(this));
    todoUl.addEventListener("click", this.completeTask.bind(this));
    stateDiv.addEventListener("click", this.showActive.bind(this));
    input.addEventListener("click", this.removePlaceholder);
    document.addEventListener("keydown", this.createTodo.bind(this));
    stateDiv.addEventListener("mouseover", this.showHover.bind(this));
    stateDiv.addEventListener("mouseout", this.removeHover.bind(this));
    clearPara.addEventListener("mouseover", this.showClearHover);
    clearPara.addEventListener("mouseout", this.hideClearHover);
    todoUl.addEventListener("mouseover", this.addTodoHover.bind(this));
    todoUl.addEventListener("mouseout", this.removeTodoHover.bind(this));
    todoUl.addEventListener("click", this.deleteTodo.bind(this));
    completedpara.addEventListener("click", this.showCompleted.bind(this));
    pendingpara.addEventListener("click", this.showPending);
    allpara.addEventListener("click", this.showAll);
    clear.addEventListener("click", this.clearFunc);
    this.dragFunc();
  }

  changeMode() {
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    const input = document.querySelector(".create");
    const todoContainer = document.querySelector(".todoListContainer");
    const functionDiv = document.querySelector(".functions");
    const circle = document.querySelectorAll(".circle");
    const todoList = document.querySelectorAll(".todoList");
    const todoInfo = document.querySelectorAll(".todoInfo");
    const functionPara = functionDiv.querySelectorAll("p");
    const stateDiv = functionDiv.querySelector(".state");
    const mainHead = document.querySelector("h1");
    const arr = [
      main,
      header,
      input,
      todoContainer,
      functionDiv,
      stateDiv,
      mainHead,
    ];
    const secondArr = [circle, todoList, todoInfo, functionPara];
    if (mode.dataset.mode === "moon") {
      this.changeModeImg("sun");
    } else {
      this.changeModeImg("moon");
    }

    // toggling the light class on array of elements to change mode
    this.toggleLightMode(arr, secondArr);
  }
  toggleLightMode(array, array2) {
    const forEachArray = [array, ...array2];
    forEachArray.forEach((arr) =>
      arr.forEach((arrayEl) => arrayEl.classList.toggle("light"))
    );
  }

  changeModeImg(string) {
    let newSrc = `/images/icon-${mode.dataset.mode}.svg`;
    mode.setAttribute("src", newSrc);
    mode.dataset.mode = string;
  }

  completeTask(event) {
    // marks the clicked option as a completed task
    this.markComplete(event);

    this.addAttribute(event);
  }

  markComplete(ev) {
    let circle = ev.target.closest(".circle");
    if (!circle) return;
    let list = circle.closest(".todoList");
    const task = list.querySelector(".todoInfo");
    const check = circle.querySelector("img");
    task.classList.add("completed");
    circle.classList.add("completed");
    check.classList.add("show");
    this.decreaseLength();
  }

  addAttribute(ev) {
    let list = ev.target.closest(".todoList");
    if (!list) return;
    list.setAttribute("data-status", "completed");
  }

  showActive(e) {
    // adding the active class to clicked and removing active class from siblings
    this.addActive(e);
  }

  addActive(event) {
    let para = event.target;
    if (!para) return;
    let siblings = para.closest(".state").querySelectorAll("p");
    siblings.forEach((sib) => {
      if (sib === para) return;
      sib.classList.remove("active");
    });
    para.classList.add("active");
  }

  showHover(e) {
    // selecting the p tag
    let para = e.target;
    if (!para) return;
    // adding the hover class when mouse is over the para
    para.classList.add("hover");
  }

  removeHover(e) {
    // selecting the p tag
    let para = e.target;
    if (!para) return;

    // removing the hover class when mouse is over the para
    para.classList.remove("hover");
  }

  removePlaceholder() {
    input.removeAttribute("placeholder");
    const list = document.querySelectorAll(".todoList");
    list.forEach((item) => item.classList.remove("hide"));
  }

  createTodo(e) {
    if (e.key === "Enter") {
      const text = input.value;

      // creating and inserting the markup for the new to do entry
      this.todoMarkup(text);

      // adding the scroll feature on overflow
      this.addScroller();
    } else return;
    e.preventDefault();
    // setting the placeholder back to its default
    input.value = "";
    input.setAttribute("placeholder", "Create a new todo...");
  }

  todoMarkup(val) {
    const markup = `
    <li class="todoList ${
      todoContainer.classList.contains("light") ? "light" : ""
    }" data-status="pending">
    <div class="todoItem" draggable="true">
      <span class="circle ${
        todoContainer.classList.contains("light") ? "light" : ""
      }">
        <img src="/images/icon-check.svg" alt="" />
      </span>
      <p class="todoInfo ${
        todoContainer.classList.contains("light") ? "light" : ""
      }">${val}</p>
    </div>
    <img src="/images/icon-cross.svg" alt="" class="cross" />
  </li>
    `;
    console.log(todoContainer.classList.contains("light"));
    todoUl.insertAdjacentHTML("afterbegin", markup);
    todoList = document.querySelectorAll(".todoList");
    this.increaseLength();
  }

  addScroller() {
    if (todoList.length > 6) {
      todoUl.classList.add("overflow");
    }
  }

  showClearHover() {
    clearPara.classList.add("hover");
  }

  hideClearHover() {
    clearPara.classList.remove("hover");
  }

  addTodoHover(e) {
    const item = e.target.closest(".todoList");
    const circle = e.target.closest(".circle");
    if (item) {
      let cross = item.querySelector(".cross");
      cross.classList.add("show");
    }
    if (circle) {
      circle.classList.add("hover");
    }
  }

  removeTodoHover(e) {
    const item = e.target.closest(".todoList");
    const circle = e.target.closest(".circle");
    if (item) {
      let cross = item.querySelector(".cross");
      cross.classList.remove("show");
    }
    if (circle) {
      circle.classList.remove("hover");
    }
  }

  deleteTodo(e) {
    const close = e.target.closest(".cross");
    if (!close) return;
    const item = close.closest(".todoList");
    const circle = item.querySelector(".circle");
    item.remove();
    if (circle.classList.contains("completed")) return;
    this.decreaseLength();
  }

  showCompleted() {
    const list = document.querySelectorAll(".todoList");
    list.forEach((item) => {
      item.classList.remove("hide");
      if (item.dataset.status === "completed") return;
      item.classList.add("hide");
    });
    todoList = document.querySelectorAll(".todoList");
    if (todoList.length <= 6) {
      todoUl.classList.remove("overflow");
    }
  }
  showPending() {
    const list = document.querySelectorAll(".todoList");
    list.forEach((item) => {
      item.classList.remove("hide");
      if (item.dataset.status === "pending") return;
      item.classList.add("hide");
    });
    todoList = document.querySelectorAll(".todoList");
    if (todoList.length <= 6) {
      todoUl.classList.remove("overflow");
    }
  }

  showAll() {
    const list = document.querySelectorAll(".todoList");
    list.forEach((item) => item.classList.remove("hide"));
    todoList = document.querySelectorAll(".todoList");
    if (todoList.length <= 6) {
      todoUl.classList.remove("overflow");
    }
  }

  decreaseLength() {
    this.length--;
    length.textContent = this.length;
  }

  increaseLength() {
    this.length++;
    length.textContent = this.length;
  }

  clearFunc() {
    const list = document.querySelectorAll(".todoList");
    list.forEach((item) => {
      if (item.dataset.status === "completed") item.remove();
    });
    todoList = document.querySelectorAll(".todoList");
    if (todoList.length <= 6) {
      todoUl.classList.remove("overflow");
    }
  }

  dragFunc() {
    const list = document.querySelectorAll(".todoList");
    const info = document.querySelectorAll(".todoItem");
    let switched;

    const swapItems = function (first, second) {
      // selecting the todoList and the todoItem for the first and second
      const parent1 = first.closest(".todoList");
      const child1 = second.querySelector(".todoItem");
      if (first === child1) return;
      // selecting the cross image for both first and second
      const cross1 = parent1.querySelector(".cross");
      const cross2 = second.querySelector(".cross");

      // removing the cross image for both first and second
      cross1.remove();
      cross2.remove();

      // creating a new cross markup
      const markup = `<img src="/images/icon-cross.svg" alt="" class="cross" />`;

      // appending the the second - child(todoItem) into parent1 (first - parent (todoList))
      parent1.appendChild(child1);

      // apending the first(todoItem) into the second (todoList)
      second.appendChild(first);

      // inserting the cross image for the first (its parent - todoList) & for the second(todoList)
      parent1.insertAdjacentHTML("beforeend", markup);
      second.insertAdjacentHTML("beforeend", markup);

      // switching the dataset properties
      let temp = parent1.dataset.status;
      parent1.dataset.status = second.dataset.status;
      second.dataset.status = temp;
    };
    const dragStart = function (e) {
      const item = e.target.closest(".todoItem");
      if (!item) return;
      switched = item;
    };
    const dragEnter = function (e) {
      // console.log("dragenter");
      let list = e.target.closest(".todoList");
      if (!list) return;
      // console.log(list);
      list.classList.add("over");
    };
    const dragLeave = function (e) {
      let list = e.target.closest(".todoList");
      if (!list) return;
      list.classList.remove("over");
    };
    const dragOver = function (e) {
      // console.log("dragover");
      e.preventDefault();
    };
    const dragDrop = function (e) {
      let list = e.target.closest(".todoList");
      if (!list) return;
      const dragEnd = list;
      swapItems(switched, dragEnd);
      list.classList.remove("over");
    };
    todoUl.addEventListener("dragstart", dragStart);
    todoUl.addEventListener("dragover", dragOver);
    todoUl.addEventListener("dragenter", dragEnter);
    todoUl.addEventListener("dragleave", dragLeave);
    todoUl.addEventListener("drop", dragDrop);
  }
}

const Todo = new App();