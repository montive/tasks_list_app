import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TaskStatusBadge from "../TaskStatusBadge";
import { TasksListContext } from "../../context/TasksListContext";
import { editTask } from "../../services/TasksServices";

function TaskEditModal({ showModal, setShowModal, task }) {
    const [taskTitle, setTaskTitle] = useState(task.title);
    const [taskDescription, setTaskDescription] = useState(task.description || "");
    const [taskStatus, setTaskStatus] = useState(task.complete);
    let buttonTitle = "Mark task as " + (taskStatus ? "uncomplete" : "complete");
    const { tasksList, setTasksList } = useContext(TasksListContext);
    const handleSave = () => {
        task = { ...task, title: taskTitle, description: taskDescription };
        editTask(task).then((res) => {
            if (res.status_code === 200) {
                const newTasksList = tasksList.map((obj) => {
                    if (obj.id === task.id) return { ...task };
                    return obj;
                });
                setTasksList(newTasksList);
                setShowModal(false);
            } else {
                console.error(res.status_code, res.message);
            }
        });
    };
    const handleCancel = () => setShowModal(false);
    if (showModal) {
        return (
            <Modal show={showModal} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>{task.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                id="title"
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                id="description"
                                value={taskDescription || ""}
                                onChange={(e) => setTaskDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status:</Form.Label>
                            <div className="d-flex">
                                <div id="task-status-badge-container">
                                    <TaskStatusBadge taskComplete={taskStatus} />
                                </div>
                                <Button
                                    className="btn custom-button action-button bg-white"
                                    onClick={() => setTaskStatus(!taskStatus)}
                                    title={buttonTitle}>
                                    {taskStatus ? (
                                        <i className="bi bi-x-circle-fill"></i>
                                    ) : (
                                        <i className="bi bi-check-circle-fill"></i>
                                    )}
                                </Button>
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    } else {
        return null;
    }
}

export default TaskEditModal;
