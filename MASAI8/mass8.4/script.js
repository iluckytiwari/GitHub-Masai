document.addEventListener("DOMContentLoaded", fetchTasks);

async function fetchTasks() {
    try {
        const response = await fetch("https://mockapi.io/tasks");
        if (!response.ok) throw new Error("Failed to fetch tasks.");
        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error(error.message);
    }
}

function displayTasks(tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${task.title} - ${task.status}
            <button class="edit-btn" onclick="openEditModal('${task.id}', '${task.title}', '${task.status}')">Edit</button>
            <button class="delete-btn" onclick="deleteTask('${task.id}')">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function openEditModal(id, title, status) {
    document.getElementById("editTaskTitle").value = title;
    document.getElementById("editTaskStatus").value = status;
    document.getElementById("editModal").style.display = "flex";
    document.getElementById("editModal").dataset.taskId = id;
}

async function updateTask() {
    const id = document.getElementById("editModal").dataset.taskId;
    const title = document.getElementById("editTaskTitle").value;
    const status = document.getElementById("editTaskStatus").value;
    try {
        const response = await fetch(`https://mockapi.io/tasks/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, status })
        });
        if (!response.ok) throw new Error("Failed to update task.");
        closeModal();
        fetchTasks();
    } catch (error) {
        console.error(error.message);
    }
}

async function deleteTask(id) {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
        function fetchTasks() {
    const tasks = [
        { id: "1", title: "Learn JavaScript", status: "pending" },
        { id: "2", title: "Build a Project", status: "completed" }
    ];
    displayTasks(tasks);
}

    } catch (error) {
        console.error(error.message);
    }
}

function closeModal() {
    document.getElementById("editModal").style.display = "none";
}
