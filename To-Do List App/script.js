document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if(storedTasks){
        storedTasks.forEach( task => tasks.push(task));
        updateTaskListUI();
        updateStats();
    }
});

let tasks = [];
let editIndex = null; // To track the index of the task being edited

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

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
        updateStats();
        saveTasks();
    }
};

const toggleTaskStatus = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskListUI();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskListUI();
    updateStats();
    saveTasks();
};

// Edit task functionality
const editTask = (index) => {
    const input = document.getElementById("taskInput");
    input.value = tasks[index].text; // Pre-fill the input with the current task text
    editIndex = index; // Track the index of the task being edited
    updateStats();
    saveTasks();
};

const updateStats = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completedTasks/totalTasks) * 100;

    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;
    document.getElementById("nums").innerHTML = `${completedTasks} / ${totalTasks}`;

    if(tasks.length && completedTasks == totalTasks){
        hurrah();
    }
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

const hurrah = () => {
    const count = 200,
    defaults = {
        origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
    confetti(
        Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
        })
    );
    }

    fire(0.25, {
    spread: 26,
    startVelocity: 55,
    });

    fire(0.2, {
    spread: 60,
    });

    fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    });

    fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    });

    fire(0.1, {
    spread: 120,
    startVelocity: 45,
    });
}


document.getElementById("deleteAll").addEventListener("click", () => {
    tasks = []; 
    saveTasks(); 
    updateTaskListUI(); 
    updateStats(); 
});

document.getElementById("resetAll").addEventListener("click", () => {
    tasks.forEach(task => (task.completed = false)); 
    saveTasks(); 
    updateTaskListUI(); 
    updateStats(); 
});
