import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { updateTaskAsync } from "../reducers/taskReducer";

function TaskCheckbox({ task, onTaskChange }) {
    const dispatch = useDispatch();

    const handleCheckboxClick = () => {
        const updatedTask = { ...task, complete: !task.complete };
        dispatch(updateTaskAsync(updatedTask));
        onTaskChange(updatedTask);
    };

    return (
        <Form.Check
            className="fs-4"
            type="checkbox"
            role="button"
            defaultChecked={task.complete}
            onClick={handleCheckboxClick}
        />
    );
}

export default TaskCheckbox;
