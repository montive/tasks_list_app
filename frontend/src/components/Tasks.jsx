import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskCard from "./TaskCard";
import { getTasksAsync } from "../reducers/taskReducer";

function Tasks() {
    const dispatch = useDispatch();
    const { tasks } = useSelector((state) => state.task);
    const [activeTasks, setActiveTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        dispatch(getTasksAsync());
    }, [dispatch]);

    useEffect(() => {
        const newActiveTasks = [];
        const newCompletedTasks = [];
        tasks.forEach((task) => {
            if (task.complete === false) {
                newActiveTasks.push(task);
            } else {
                newCompletedTasks.push(task);
            }
        });
        setActiveTasks(newActiveTasks);
        setCompletedTasks(newCompletedTasks);
    }, [tasks]);

    return (
        <div id="task-items-list">
            <div
                className="box sticky-top bg-white border-0"
                id="header-section"
            >
                <div className="row">
                    <div className="header-col">Active Tasks</div>
                </div>
            </div>
            <div>
                {activeTasks &&
                    activeTasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
            </div>
            <div
                className="box sticky-top bg-white border-0"
                id="header-section"
            >
                <div className="row">
                    <div className="header-col">Completed Tasks</div>
                </div>
            </div>
            <div>
                {completedTasks &&
                    completedTasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
            </div>
        </div>
    );
}

export default Tasks;
