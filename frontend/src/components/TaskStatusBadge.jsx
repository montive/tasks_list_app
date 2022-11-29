function TaskStatusBadge({taskComplete}) {
    if (taskComplete) 
        return <span className="badge bg-success status-badge">Completed</span>
    else
        return <span className="badge bg-secondary status-badge">Not Completed</span>
}

export default TaskStatusBadge