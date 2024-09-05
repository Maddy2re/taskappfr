document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('taskForm');
    const input = document.getElementById('taskInput');
    const list = document.getElementById('taskList');
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const closePopupButton = document.getElementById('closePopup');

    // Load saved tasks from local storage when page loads
    loadTasks();

    // Event listener for form submission to add new tasks
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = input.value.trim();

        if (taskText !== '') {
            addTask(taskText);
            input.value = ''; // Clear input field
            saveTasks(); // Save tasks to local storage
        }
    });

    // Function to create a new task element and add it to the task list
    function addTask(taskText, isCompleted = false) {
        const li = document.createElement('li');
        li.className = 'list-group-item';

        // Checkbox for task completion
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input checkbox-large';
        checkbox.checked = isCompleted; // Set checkbox based on task status

        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed', checkbox.checked);
            saveTasks(); // Save task status after completion change
        });

        // Task label
        const label = document.createElement('label');
        label.textContent = taskText;
        label.className = 'task-text';

        // Delete button for removing tasks
        const button = document.createElement('button');
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>';
        button.className = 'delete-btn';
        button.addEventListener('click', () => {
            li.remove(); // Remove task from the list
            saveTasks(); // Save updated tasks to local storage
        });

        // Append elements to the list item
        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(button);

        // If the task is marked as completed, add the 'completed' class
        if (isCompleted) {
            li.classList.add('completed');
        }

        // Add the list item to the task list
        list.appendChild(li);
    }

    // Function to load tasks from local storage and display them
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task.text, task.completed));
    }

    // Function to save tasks to local storage
    function saveTasks() {
        const tasks = Array.from(list.children).map(li => ({
            text: li.querySelector('.task-text').textContent,
            completed: li.classList.contains('completed')
        }));

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Show popup on first visit
    if (!localStorage.getItem('hasVisited')) {
        overlay.style.display = 'block';
        popup.style.display = 'block';
        localStorage.setItem('hasVisited', 'true');
    }

    // Close popup when the button is clicked
    closePopupButton.addEventListener('click', () => {
        overlay.style.display = 'none';
        popup.style.display = 'none';
    });
});
