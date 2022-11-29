import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { getTasksList } from "../services/TasksServices";

export const TasksListContext = createContext();

export const TasksListContextProvider = (props) => {
    const [tasksList, setTasksList] = useState([]);
    useEffect(() => {
        getTasksList().then((res) => {
            if (res.status_code === 200)
                setTasksList(res.tasks_list);
            else
                console.error(res.status_code, res.message);
        });
    }, []);

    return (
        <TasksListContext.Provider value={{ tasksList, setTasksList }}>
            {props.children}
        </TasksListContext.Provider>
    );
};
