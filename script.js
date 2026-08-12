const taskContainerEl = document.querySelector("#task-container");
let latestTaskId = 4;

let tasks = [

{ id : 1,
  title : "Web Development Studies",
  description : ["Learn JavaScript", "Learn React"], 
  priority : "High",
  due_date : "Sep. 2026",
  completed : false
},

{
  id : 2, 
  title : "Technical Interview Prep",
  description : ["Solve Graph Problems", "Solve Neetcode 150"], 
  priority : "High",
  due_date : "Oct. 2026",
  completed : false

},

{
  id : 3, 
  title : "Machine Learning Fundamentals",
  description : ["Learn Supervised Training", "Learn Deep Learning"], 
  priority : "High",
  due_date : "Sep. 2026",
  completed : false

}

];


const renderTasks = () => {

  taskContainerEl.innerHTML = "";
  
  for (let task of tasks){
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
    renderTasks();
  })

    const deleteBtn = taskEl.querySelector(".delete-btn")
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter(cur_task => cur_task.id !== task.id);
      renderTasks();
    })
  
    if (task.completed){
      taskEl.classList.add("completed");
      completeBtn.textContent = "Completed";
    }

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
    description: desc.split(",").map(item => item.trim()), 
    priority,
    due_date: date_due ? due_date:"not specified",
    completed: false
    }


  ++latestTaskId;

  tasks.push(newTask);
  renderTasks()

}



}

activateAddTaskBtn();

renderTasks();



