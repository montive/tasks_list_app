import React, { useEffect, useState } from "react";
import TaskDelete from "./TaskDelete";
import TaskCheckbox from "./TaskCheckbox";

function TaskCard({ task }) {
    const [currentTask, setCurrentTask] = useState(task);

    useEffect(() => {
        setCurrentTask(task);
    }, [task]);

    const handleTaskChange = (updatedTask) => {
        setCurrentTask(updatedTask);
    };

    return (
        <div className="row box item-section">
            <div className="col-2 task-title">
                <TaskCheckbox
                    task={currentTask}
                    onTaskChange={handleTaskChange}
                />
            </div>
            <div className="col-7 task-title">{task.title}</div>
            <div className="col-3">
                <TaskDelete task={task} />
            </div>
        </div>
    );
}

export default TaskCard;
