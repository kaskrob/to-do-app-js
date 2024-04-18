$(document).ready(function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const themeToggle = document.getElementById("themeToggle");
    const allFilter = document.getElementById("allFilter");
    const activeFilter = document.getElementById("activeFilter");
    const completedFilter = document.getElementById("completedFilter");
    const clearCompleted = document.getElementById("clearCompleted");
  
    function createTaskItem(taskContent) {
      const taskItem = document.createElement("li");
      taskItem.className = "task-item";
      taskItem.innerText = taskContent;
      taskItem.draggable = true;
      taskItem.dataset.completed = "false";
      taskItem.addEventListener("click", toggleTask);
      
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = "&times;";
      deleteButton.className = "delete-btn";
      deleteButton.addEventListener("click", deleteTask);
      
      taskItem.appendChild(deleteButton);
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
  
    //  poista
    function deleteTask(event) {
      event.stopPropagation(); // Prevents the task from being toggled when clicking delete
      this.parentNode.remove();
    }
  
    addTaskBtn.addEventListener("click", addTask);
  
    taskInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        addTask();
      }
    });
  
    // pimeä mode 
    themeToggle.addEventListener("change", function() {
      document.body.classList.toggle("dark-mode");
    });
  
    // pudota ja vedä
    Sortable.create(taskList, {
      animation: 150,
      ghostClass: 'ghost',
      onEnd: function() {
        taskList.querySelectorAll('.task-item').forEach((task, index) => {
          task.dataset.order = index;
        });
      }
    });
  
    // suodata
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
  
    // pyyhi valmiit
    clearCompleted.addEventListener("click", function() {
      taskList.querySelectorAll('.task-item').forEach(task => {
        if (task.dataset.completed === "true") {
          task.remove();
        }
      });
    });
  });
  
