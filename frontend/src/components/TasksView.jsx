import TaskCreation from "./TaskCreation";
import Tasks from "./Tasks";

function TasksView() {
    return (
        <div className="background-layout vh-100">
            <div className="box-layout">
                <div className="container">
                    <TaskCreation />
                    <Tasks />
                </div>
            </div>
        </div>
    );
}

export default TasksView;
