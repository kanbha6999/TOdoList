document.addEventListener('DOMContentLoaded', function () {
    // Retrieve tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    const taskList = document.getElementById('taskList');
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
  
    function updateTaskList() {
      taskList.innerHTML = '';
      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
          <button class="complete">${task.completed ? 'Uncomplete' : 'Complete'}</button>
        `;
  
        listItem.querySelector('.edit').addEventListener('click', () => {
          const newText = prompt('Edit the task:', task.text);
          if (newText !== null) {
            task.text = newText;
            updateLocalStorage();
            updateTaskList();
          }
        });
  
        listItem.querySelector('.delete').addEventListener('click', () => {
          tasks.splice(i, 1);
          updateLocalStorage();
          updateTaskList();
        });
  
        listItem.querySelector('.complete').addEventListener('click', () => {
          task.completed = !task.completed;
          updateLocalStorage();
          updateTaskList();
        });
  
        taskList.appendChild(listItem);
      }
    }
  
    function updateLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    addTaskButton.addEventListener('click', () => {
      const text = taskInput.value.trim();
      if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = '';
        updateLocalStorage();
        updateTaskList();
      }
    });
  
    updateTaskList();
  });
  