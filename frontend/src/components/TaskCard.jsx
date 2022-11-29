import React from 'react'
import TaskDeleteButton from './TaskDeleteButton'
import TaskEditButton from './TaskEditButton'
import TaskStatusBadge from './TaskStatusBadge'
import TaskChangeStatusButton from './TaskChangeStatusButton'

function TaskCard({task}) {
  return (
    // <div>{task.title}</div>
    <div className="row box item-section">
            <div className="col-3 task-title">{task.title}</div>
            <div className="col-3">
                <TaskStatusBadge taskComplete={task.complete} />
            </div>
            <div className="col-6">
                <div className="btn-group-lg">
                    <TaskChangeStatusButton task={task}/>
                    <TaskEditButton task={task} />
                    <TaskDeleteButton task={task} />
                </div>
            </div>
        </div>
  )
}

export default TaskCard