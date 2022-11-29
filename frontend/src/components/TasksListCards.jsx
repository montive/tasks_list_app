import TaskCard from "./TaskCard";

function TasksListCards({ tasksList }) {
    return (
        <div>
            {tasksList.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
}

export default TasksListCards;
