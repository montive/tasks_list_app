import { useState } from "react";
import TaskEditModal from "./modals/TaskEditModal";

function TaskEdit({ task }) {
    const [showModal, setShowModal] = useState(false);
    const handleClick = () => {
        setShowModal(true);
    };
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
            <TaskEditModal
                showModal={showModal}
                setShowModal={setShowModal}
                task={task}
            />
        </>
    );
}

export default TaskEdit;
