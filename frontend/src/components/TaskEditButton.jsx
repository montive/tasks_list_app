import { useState } from "react";
import TaskEditModal from "./modals/TaskEditModal";

function TaskEditButton({task}) {
    const [showModal, setShowModal] = useState(false)
    const handleClick = () => {
        console.log(showModal)
        setShowModal(true);
    }
    return (
        <>
            <button
                type="button"
                id="task-edit-button"
                className="btn action-button"
                // data-bs-toggle="modal"
                // data-bs-target="#Modal-Edit-Item-{{ task.id }}"
                onClick={handleClick}
            >
                <i className="bi bi-pencil-fill"></i>{" "}
            </button>
            <TaskEditModal showModal={showModal} setShowModal={setShowModal} task={task} />
        </>
    );
}

export default TaskEditButton;
