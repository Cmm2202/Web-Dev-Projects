let tasks = [];
let editIndex = null; // To track the index of the task being edited

const addTask = () => {
    const input = document.getElementById("taskInput");
    const task = input.value.trim();

    if (task) {
        if (editIndex !== null) {
            // Update the existing task instead of adding a new one
            tasks[editIndex].text = task;
            editIndex = null; // Reset editIndex after editing
        } else {
            // Add a new task
            tasks.push({ text: task, completed: false });
        }
        input.value = ""; // Clear input field
        updateTaskListUI();
    }
};

const toggleTaskStatus = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskListUI();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskListUI();
};

// Edit task functionality
const editTask = (index) => {
    const input = document.getElementById("taskInput");
    input.value = tasks[index].text; // Pre-fill the input with the current task text
    editIndex = index; // Track the index of the task being edited
};

const updateTaskListUI = () => {
    const taskListUI = document.getElementById("task-list");
    taskListUI.innerHTML = null;

    tasks.forEach((tsk, index) => {
        const listElement = document.createElement("li");
        listElement.innerHTML = `
            <div class="taskItem">
                <div class="task ${tsk.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" ${tsk.completed ? "checked" : ""} />
                    <p>${tsk.text}</p>
                </div>
                <div class="icons">
                    <img src="./images/edit.png" alt="edit icon image" onClick="editTask(${index})" />
                    <img src="./images/bin.png" alt="bin icon image" onClick="deleteTask(${index})" />
                </div>
            </div>
        `;

        listElement.addEventListener("change", () => toggleTaskStatus(index));
        taskListUI.appendChild(listElement);
    });
};

document.getElementById("newTask").addEventListener("click", (event) => {
    event.preventDefault();
    addTask(); // Handle adding or updating the task
});
