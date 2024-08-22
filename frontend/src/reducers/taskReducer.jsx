import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createTaskAsync = createAsyncThunk(
    "task/createTaskAsync",
    async (task) => {
        const response = await fetch("/tasks/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        if (response.ok) {
            return await response.json();
        }
    },
);

export const getTasksAsync = createAsyncThunk(
    "task/getTasksAsync",
    async () => {
        const response = await fetch("/tasks");
        if (response.ok) {
            return await response.json();
        }
    },
);

export const updateTaskAsync = createAsyncThunk(
    "task/updateTasksAsync",
    async (task) => {
        const response = await fetch(`/tasks/update/${task.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        if (response.ok) {
            return { task };
        }
    },
);

export const deleteTaskAsync = createAsyncThunk(
    "task/deleteTasksAsync",
    async (taskId) => {
        const response = await fetch(`/tasks/delete/${taskId}`, {
            method: "DELETE",
        });
        return await response.json();
    },
);

const initialState = {
    tasks: [],
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        createTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        updateTask: (state, action) => {
            const task = state.tasks.find(
                (task) => task.id === action.payload.id,
            );
            task.title = action.payload.title;
            task.status = action.payload.status;
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(
                (task) => task.id !== action.payload,
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTaskAsync.fulfilled, (state, action) => {
                state.tasks.push(action.payload.task);
            })
            .addCase(getTasksAsync.fulfilled, (state, action) => {
                state.tasks.push(...action.payload.tasks);
            })
            .addCase(updateTaskAsync.fulfilled, (state, action) => {
                const task = state.tasks.find(
                    (task) => task.id === action.payload.task.id,
                );
                task.title = action.payload.task.title;
                task.complete = action.payload.task.complete;
            })
            .addCase(deleteTaskAsync.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(
                    (task) => task.id !== action.meta.arg,
                );
            });
    },
});

export const { createTask, updateTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
