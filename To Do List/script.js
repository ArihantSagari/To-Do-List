let taskList = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDate');
    const dueTimeInput = document.getElementById('dueTime');

    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const dueTime = dueTimeInput.value;

    if (taskText !== '') {
        const task = {
            text: taskText,
            dueDate: dueDate,
            dueTime: dueTime,
            completed: false,
            timestamp: new Date().getTime()
        };
        taskList.push(task);
        renderTasks();
        taskInput.value = '';
        dueDateInput.value = '';
        dueTimeInput.value = '';
    }
}

function deleteTask(index) {
    taskList.splice(index, 1);
    renderTasks();
}

function editTask(index) {
    const newText = prompt('Edit task:', taskList[index].text);
    if (newText !== null) {
        taskList[index].text = newText;
        renderTasks();
    }
}

function toggleTaskCompletion(index) {
    taskList[index].completed = !taskList[index].completed;
    renderTasks();
}

function renderTasks() {
    const taskListElement = document.getElementById('taskList');
    taskListElement.innerHTML = '';

    taskList.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.draggable = true;
        li.innerHTML = `
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="task${index}" ${task.completed ? 'checked' : ''} onchange="toggleTaskCompletion(${index})">
                <label class="custom-control-label ${task.completed ? 'completed-task' : ''}" for="task${index}">${task.text}</label>
            </div>
            <div>
                <span class="badge badge-primary badge-pill">${formatDate(task.dueDate, task.dueTime)}</span>
                <button type="button" class="btn btn-sm btn-warning mx-1" onclick="editTask(${index})"><i class="fas fa-edit"></i></button>
                <button type="button" class="btn btn-sm btn-danger" onclick="deleteTask(${index})"><i class="fas fa-trash-alt"></i></button>
            </div>`;
        taskListElement.appendChild(li);
    });

    enableDragAndDrop();
}

function formatDate(dueDate, dueTime) {
    const dateTime = new Date(dueDate + 'T' + dueTime);
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return dateTime.toLocaleDateString('en-US', options);
}

function enableDragAndDrop() {
    new Sortable(taskListElement, {
        animation: 150,
        ghostClass: 'bg-light'
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const taskListElement = document.getElementById('taskList');
    enableDragAndDrop();
});
