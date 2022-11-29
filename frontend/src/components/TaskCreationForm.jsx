import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { addTask } from "../services/TasksServices";
import { TasksListContext } from "../context/TasksListContext";

function TaskCreationForm() {
    const [taskTitle, setTaskTitle] = useState("")
    const { tasksList, setTasksList } = useContext(TasksListContext);

    const handleQuickAdd = () => {
        debugger
        addTask({title: taskTitle, description: "", complete: false})
            .then(res => {
                if (res.status_code === 201) {
                    // setTasksList([...tasksList, {title: taskTitle}])
                } else {
                    console.error(res.status_code, res.message)
                }
            })
    }

    const handleCompleteAdd = () => {}
    return (
        <Form inline="true" className="create-task-form mb-3">
            <Form.Group>
                {/* <Form.Label>Title:</Form.Label> */}
                <Row>
                    <Col sm={9} md={9} lg={9} className="pe-0">
                        <Form.Control className="w-100" type="text" placeholder="Enter Task..." 
                            value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}/>
                    </Col>
                    <Col sm={3} md={3} lg={3}>
                        <Dropdown as={ButtonGroup} className="w-100">
                            <Button className="btn custom-button blue-button" onClick={() => handleQuickAdd()}>Quick Add</Button>
                            <Dropdown.Toggle split className="btn custom-button blue-button" />
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleCompleteAdd()}>Complete Add</Dropdown.Item>
                                {/* <button
                                    type="button"
                                    className="dropdown-item btn custom-button blue-button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#Modal-Create-Task"
                                >
                                    Complete Add
                                </button> */}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    );
}

export default TaskCreationForm;
