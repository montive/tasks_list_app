import { useDispatch } from "react-redux";
import { deleteTaskAsync } from "../reducers/taskReducer";

function TaskDelete({ task }) {
    const dispatch = useDispatch();
    const handleOnClick = () => {
        dispatch(deleteTaskAsync(task.id));
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

export default TaskDelete;
