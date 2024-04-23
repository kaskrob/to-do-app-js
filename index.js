$(document).ready(function() {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const themeToggle = document.getElementById("themeToggle");
  const allFilter = document.getElementById("allFilter");
  const activeFilter = document.getElementById("activeFilter");
  const completedFilter = document.getElementById("completedFilter");
  const clearCompleted = document.getElementById("clearCompleted");

  // Function to create a new task item
  function createTaskItem(taskContent) {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
      <span>${taskContent}</span>
      <button class="delete-btn">&times;</button>
    `;
    taskItem.dataset.completed = "false";
    taskItem.querySelector('.delete-btn').addEventListener("click", function(event) {
      event.stopPropagation(); // Prevents the task from being toggled when clicking delete
      taskItem.remove();
    });
    taskItem.addEventListener("click", toggleTask);
    taskList.appendChild(taskItem);
  }

  function addTask() {
    const taskContent = taskInput.value.trim();
    if (taskContent !== "") {
      createTaskItem(taskContent);
      taskInput.value = ""; // Clear input field
    }
  }

  function toggleTask() {
    this.dataset.completed = this.dataset.completed === "true" ? "false" : "true";
    this.classList.toggle("completed");
  }

  addTaskBtn.addEventListener("click", addTask);

  // Optional: You can add the functionality to add tasks by pressing Enter key
  taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  themeToggle.addEventListener("change", function() {
    document.body.classList.toggle("dark-mode");
  });

  Sortable.create(taskList, {
    animation: 150,
    ghostClass: 'ghost',
    onEnd: function() {
      taskList.querySelectorAll('.task-item').forEach((task, index) => {
        task.dataset.order = index;
      });
    }
  });

  allFilter.addEventListener("click", function() {
    taskList.querySelectorAll('.task-item').forEach(task => {
      task.style.display = "block";
    });
  });

  activeFilter.addEventListener("click", function() {
    taskList.querySelectorAll('.task-item').forEach(task => {
      if (task.dataset.completed === "true") {
        task.style.display = "none";
      } else {
        task.style.display = "block";
      }
    });
  });

  completedFilter.addEventListener("click", function() {
    taskList.querySelectorAll('.task-item').forEach(task => {
      if (task.dataset.completed === "false") {
        task.style.display = "none";
      } else {
        task.style.display = "block";
      }
    });
  });

var clearBtn = document.getElementById("clear");

