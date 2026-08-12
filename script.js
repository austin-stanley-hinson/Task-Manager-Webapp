const taskContainerEl = document.querySelector("#task-container");
let latestTaskId = 0;

let currentView = "all";

let tasks = [];

const storedTasks = localStorage.getItem("tasks");

if (storedTasks) {
  tasks = JSON.parse(storedTasks);

  if (tasks.length > 0) {
    latestTaskId = Math.max(...tasks.map(task => task.id)) + 1;
  }
}
const renderTasks = () => {

  taskContainerEl.innerHTML = "";

  let visibleTasks = [...tasks];

  if (currentView === "active") {
    visibleTasks = visibleTasks.filter(task => !task.completed);
  }

  if (currentView === "completed") {
    visibleTasks = visibleTasks.filter(task => task.completed);
  }  

  for (let task of visibleTasks){
    const taskEl = document.createElement("div");
    taskEl.className = "task";

    const descriptionHTML = task.description.map(desc => `<li>${desc}</li>`).join("")

    taskEl.innerHTML = `

      <h1>${task.title}</h1>
        <ul> ${descriptionHTML} </ul>
        <h5>Priority: ${task.priority}</h5>
        <h5>Due Date: ${task.due_date}</h5>
        <button class="complete-btn">Complete</button>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>

          `;

  
    const completeBtn = taskEl.querySelector(".complete-btn");
    completeBtn.addEventListener("click", () => {
    task.completed = !task.completed;
    console.log(task);
    persistTasks();
    renderTasks();
  })

    const deleteBtn = taskEl.querySelector(".delete-btn")
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter(cur_task => cur_task.id !== task.id);
      persistTasks();
      renderTasks();
    })
  
    if (task.completed){
      taskEl.classList.add("completed");
      completeBtn.textContent = "Completed";
    }

    const editBtn = taskEl.querySelector(".edit-btn");

    editBtn.addEventListener("click", () => {
      //want to prevent having duplicate edit forms 
      const formEl = document.createElement("form");
      formEl.id = "edit-task-form"
      formEl.innerHTML = `
    <label for="title-input">
      Title:
      <input type="text" id="title-input" required>
    </label>

    <label for="description-input">
      Description:
      <input type="text" id="description-input">
    </label>

    <label for="priority-input">
      Priority:
      <select id="priority-input">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </label>

    <label for="due-date-input">
      Due Date:
      <input type="date" id="due-date-input">
    </label>

    <button type="submit">Save changes</button>
  `;

  const taskTitleEl = formEl.querySelector("#title-input");
  taskTitleEl.value = task.title;

  const taskDescEl = formEl.querySelector("#description-input");
  taskDescEl.value = task.description.join(", ");

  const taskPriorityEl = formEl.querySelector("#priority-input");
  taskPriorityEl.value = task.priority;

  const taskDateEl = formEl.querySelector("#due-date-input");
  taskDateEl.value = task.due_date;

  formEl.addEventListener("submit", (event) => {
    event.preventDefault();

    task.title = taskTitleEl.value;
    task.description = taskDescEl.value.split(",").map(item => item.trim()).filter(item => item !== "");
    task.priority = taskPriorityEl.value;
    task.due_date = taskDateEl.value ? taskDateEl.value: task.due_date;

    formEl.remove();
    persistTasks();
    renderTasks();
  })
  
  taskEl.appendChild(formEl);

    })

    taskContainerEl.appendChild(taskEl);

  }

}

const activateAddTaskBtn = () => {
const formContainerEl = document.querySelector("#form-container");
const addTaskBtnEl = document.querySelector("#add-task-btn");

addTaskBtnEl.addEventListener("click", () => {
  formContainerEl.innerHTML = "";
  const formEl = document.createElement("form");

  formEl.innerHTML = `
    <label for="title-input">
      Title:
      <input type="text" id="title-input" required>
    </label>

    <label for="description-input">
      Description:
      <input type="text" id="description-input">
    </label>

    <label for="priority-input">
      Priority:
      <select id="priority-input">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </label>

    <label for="due-date-input">
      Due Date:
      <input type="date" id="due-date-input">
    </label>

    <button type="submit">Add Task</button>
  `;

  formEl.addEventListener("submit", (event) =>{
    event.preventDefault();

    const newTaskTitle = formEl.querySelector("#title-input").value;
    const newTaskDesc = formEl.querySelector("#description-input").value;
    const newTaskPriority = formEl.querySelector("#priority-input").value;
    const newTaskDuedate = formEl.querySelector("#due-date-input").value;

    appendNewTask(newTaskTitle, newTaskDesc, newTaskPriority, newTaskDuedate);
    formEl.remove();

  })

  formContainerEl.appendChild(formEl);

});

const appendNewTask = (title, desc, priority, date_due) => {
  const newTask = {
    id : latestTaskId,
    title,
    description: desc.split(",").map(item => item.trim()).filter(item => item !== ""), 
    priority,
    due_date: date_due ? date_due:"not specified",
    completed: false
    }


  ++latestTaskId;

  tasks.push(newTask);
  persistTasks();
  renderTasks();
}

}

const activateFilterButtons = () => {
  const filterButtons = document.querySelectorAll(".filter-btn");

  for (let button of filterButtons) {
    button.addEventListener("click", () => {
      currentView = button.dataset.view;
      renderTasks();
    });
  }
};

const persistTasks = () =>{
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

const start = () => {

  persistTasks();
  activateAddTaskBtn();
  renderTasks();
  activateFilterButtons();

}

start();


 




