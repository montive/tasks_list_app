import { useContext } from "react";
import { TasksListContext } from "../context/TasksListContext";
import { deleteTask } from "../services/TasksServices";

function TaskDeleteButton({ task }) {
    const {tasksList, setTasksList} = useContext(TasksListContext)

    const handleOnClick = () => {
        deleteTask(task.id).then((res) => {
            if (res.status_code === 200) {
                const newTasksList = tasksList.filter(obj => obj.id !== task.id);
                setTasksList(newTasksList);
            } else {
                console.error(res.status_code, res.message);
            }
        });
    };
    return (
        <button
            type="button"
            id="task-delete-button"
            className="btn action-button"
            onClick={handleOnClick}
        >
            <i className="bi bi-trash-fill"></i>
        </button>
    );
}

export default TaskDeleteButton;
