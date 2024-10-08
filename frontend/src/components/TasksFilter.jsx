import Dropdown from "react-bootstrap/Dropdown";
import { getTasksList } from "../services/TasksServices";

function TasksFilter() {
    const setParams = (option) => {
        let params = {};
        if (option !== "all") params["complete"] = option === "complete";

        return params;
    };
    const handleOnClick = (option) => {
        const params = setParams(option);
        getTasksList(params).then((res) => {
            if (res.status_code === 200) console.log(res.tasks_list);
            // setTasksList(res.tasks_list);
            else console.error(res.status_code, res.message);
        });
    };
    return (
        <Dropdown>
            <Dropdown.Toggle
                variant="outline-secondary"
                id="filter-by-dropdown"
            >
                Filter By
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleOnClick("all")}>
                    All
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleOnClick("complete")}>
                    Completed
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleOnClick("uncomplete")}>
                    Uncompleted
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default TasksFilter;
