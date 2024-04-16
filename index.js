document.addEventListener("DOMContentLoaded", function() {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  function createTaskItem(taskContent) {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerText = taskContent;
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
    this.classList.toggle("completed");
  }

  addTaskBtn.addEventListener("click", addTask);

  taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
});
