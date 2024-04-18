$(document).ready(function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const themeToggle = document.getElementById("themeToggle");
  
    // Function to create a new task item
    function createTaskItem(taskContent) {
      const taskItem = document.createElement("li");
      taskItem.className = "task-item";
      taskItem.innerText = taskContent;
      taskItem.draggable = true;
      taskItem.addEventListener("click", toggleTask);
      taskList.appendChild(taskItem);
    }
  
    // Function to add a new task
    function addTask() {
      const taskContent = taskInput.value.trim();
      if (taskContent !== "") {
        createTaskItem(taskContent);
        taskInput.value = ""; // Clear input field
      }
    }
  
    // Function to toggle task completion
    function toggleTask() {
      this.classList.toggle("completed");
    }
  
    // Event listener for adding a new task
    addTaskBtn.addEventListener("click", addTask);
  
    // Optional: You can add the functionality to add tasks by pressing Enter key
    taskInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        addTask();
      }
    });
  
    // Dark mode toggle
    themeToggle.addEventListener("change", function() {
      document.body.classList.toggle("dark-mode");
    });
  
    // Drag & drop reordering
    Sortable.create(taskList, {
      animation: 150,
      ghostClass: 'ghost',
      onEnd: function() {
        taskList.querySelectorAll('.task-item').forEach((task, index) => {
          task.dataset.order = index;
        });
      }
    });
  });
  
