import { useContext } from "react";
import { TasksListContext } from "../context/TasksListContext";
import TasksListHeader from "./TasksListHeader";
import TasksListCards from "./TasksListCards";


function TasksList() {
    const {tasksList} = useContext(TasksListContext);

    return (
        <div id="task-items-list">
            <TasksListHeader />
            <TasksListCards tasksList={tasksList} />
        </div>
    );
}

export default TasksList;
