import TaskCreationForm from "./TaskCreationForm";
import TasksFilter from "./TasksFilter";
import TasksList from "./TasksList";
import TasksListHeader from "./TasksListHeader";

function TasksView() {
    return (
        <div className="background-layout vh-100">
            <div className="box-layout">
                <div className="container">
                    <h1 className="text-center">Tasks List</h1>

                    <TaskCreationForm />
                    <TasksFilter />
                    <TasksList />
                </div>
            </div>
        </div>
    );
}

export default TasksView;
