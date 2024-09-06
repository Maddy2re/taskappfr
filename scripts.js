document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('taskForm');
    const input = document.getElementById('taskInput');
    const list = document.getElementById('taskList');
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const closePopupButton = document.getElementById('closePopup');

    loadTasks();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = input.value.trim();

        if (taskText !== '') {
            addTask(taskText);
            input.value = '';
            saveTasks(); 
        }
    });

    // Create a new task and add it to the list
    function addTask(taskText, isCompleted = false) {
        const li = document.createElement('li');
        li.className = 'list-group-item';

        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input checkbox-large';
        checkbox.checked = isCompleted;

        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed', checkbox.checked);
            saveTasks();
        });

        // Task label
        const label = document.createElement('label');
        label.textContent = taskText;
        label.className = 'task-text';

        // Delete button
        const button = document.createElement('button');
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>';
        button.className = 'delete-btn';
        button.addEventListener('click', () => {
            li.remove(); 
            saveTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(button);

        if (isCompleted) {
            li.classList.add('completed');
        }

        list.appendChild(li);
    }

    // Load tasks from local storage and display them
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task.text, task.completed));
    }

    // Save tasks to local storage
    function saveTasks() {
        const tasks = Array.from(list.children).map(li => ({
            text: li.querySelector('.task-text').textContent,
            completed: li.classList.contains('completed')
        }));

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Show popup on first visit
    /*
    if (!localStorage.getItem('hasVisited')) {
        overlay.style.display = 'block';
        popup.style.display = 'block';
        localStorage.setItem('hasVisited', 'true');
    }
    */

    // Close popup when the button is clicked
    /*
    closePopupButton.addEventListener('click', () => {
        overlay.style.display = 'none';
        popup.style.display = 'none';
    });
    */
});
