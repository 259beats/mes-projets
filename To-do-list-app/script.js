
const todoForm = document.getElementById("to-do-form");
const todoInput = document.getElementById("to-do-input");
const todoList = document.getElementById("to-do-list");

    function addTask(task) {
        const listItem = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.textContent = task;
        listItem.appendChild(taskText);
      
        const checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        listItem.appendChild(checkBox);
      
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        listItem.appendChild(deleteButton);
      
        todoList.appendChild(listItem);

        const editButton = document.createElement('button');
        editButton.textContent = 'Editer';
        listItem.appendChild(editButton);

            checkBox.addEventListener('change', function (e) {
                if (this.checked) {
                    taskText.style.textDecoration = 'line-through';
                } else {
                    taskText.style.textDecoration = 'none';
                }
            });
            
            deleteButton.addEventListener('click', function () {
                todoList.removeChild(listItem);
            });

            editButton.addEventListener('click', function () {
                const isEditing = listItem.classList.contains('editing');
                if(isEditing) {
                    taskText.textContent = this.previousSibling.value;
                    listItem.classList.remove('editing');
                    editButton.textContent = 'Edit';
                } else {
                    // Switch to edit mode
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = taskText.textContent;
                    listItem.insertBefore(input, taskText);
                    listItem.removeChild(taskText);
                    listItem.classList.add('editing');
                    editButton.textContent = 'Save';
                }
              });
              saveTasksToLocalStorage();
                }

      todoForm.addEventListener("submit", function(event){
        event.preventDefault();
    
        const newtask = todoInput.value;
            if(newtask === ""){
                alert("Entrer une tâche s'il vous plaît.");
                return;
            }
            todoInput.value = '';
            addTask(newtask);    
        });

    function completeTask(task){
        task.classList.toggle("text-decoration-line-through");
    }

    function saveTasksToLocalStorage() {
        const tasks = [];
        document.querySelectorAll('#to-do-list li').forEach(task => {
            const taskText = task.querySelector('span').textContent;
            const isCompleted = task.classList.contains('completed');
            tasks.push({ text: taskText, completed: isCompleted });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }

      document.addEventListener('DOMContentLoaded', function() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(task => {
            addTask(task.text);
        });
      });