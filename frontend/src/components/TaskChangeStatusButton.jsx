import { useContext } from "react";
import { TasksListContext } from "../context/TasksListContext";
import { editTask } from "../services/TasksServices";

function TaskChangeStatusButton({ task }) {
    let buttonTitle = "Mark task as " + (task.complete ? "uncomplete" : "complete");
    const {tasksList, setTasksList} = useContext(TasksListContext)
    
    const changeTaskStatus = () => {
        task.complete = !task.complete;
        editTask(task)
            .then(res => {
                if(res.status_code === 200) {
                    const newTasksList = tasksList.map(obj => {
                        if(obj.id === task.id)
                            return {...obj, complete: task.complete}
                        return obj
                    });
                    setTasksList(newTasksList);
                } else {
                    console.error(res.status_code, res.message)
                }
                
            });
    }

    return (
        <button type="button" id="task-status-button"
            className="btn custom-button action-button"
            onClick={changeTaskStatus} title={buttonTitle}>
            {/* {taskComplete ? "Completed" : "Uncompleted"} */}
            {task.complete ? <i className="bi bi-x-circle-fill"></i> : <i className="bi bi-check-circle-fill"></i>}

        </button>
    );
}

export default TaskChangeStatusButton;
