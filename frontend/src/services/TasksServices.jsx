export async function getTasksList(params = {}) {
    try {
        const response = await fetch(
            "/tasks?" + (new URLSearchParams(params)).toString()
        );
        return await response.json()
    } catch (error) {
        return [];
    }
}

export async function createTask(params) {
    try {
        const response = await fetch("/tasks/create", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(params)
        })
        return await response.json()
    } catch (error) {
        return error
    }
}

export async function editTask(task) {
    try {
        const response = await fetch(`/tasks/update/${task.id}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(task)
        });
        return await response.json()
    } catch (error) {
        return {};
    }
}

export async function deleteTask(taskId) {
    try {
        const response = await fetch(`/tasks/delete/${taskId}`, {
            method: "DELETE",
        });
        return await response.json()
    } catch (error) {
        return {};
    }
}