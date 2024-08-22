import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { createTaskAsync } from "../reducers/taskReducer";

function TaskCreation() {
    const dispatch = useDispatch();
    const [taskTitle, setTaskTitle] = useState("");

    const handleAdd = () => {
        dispatch(
            createTaskAsync({
                title: taskTitle,
                description: "",
                complete: false,
            }),
        );
    };

    return (
        <Form inline="true" className="create-task-form mb-3">
            <Form.Group>
                <Row>
                    <Col sm={9} md={9} lg={9} className="pe-0">
                        <Form.Control
                            className="w-100"
                            type="text"
                            placeholder="Add Task..."
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                        />
                    </Col>
                    <Col sm={3} md={3} lg={3}>
                        <Button
                            className="btn custom-button blue-button"
                            onClick={() => handleAdd()}
                        >
                            Add
                        </Button>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    );
}

export default TaskCreation;
