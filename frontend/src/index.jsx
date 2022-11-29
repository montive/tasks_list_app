import React from "react";
import ReactDOM from "react-dom/client";

// Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

// CSS
import "./index.css";

import App from "./App";
import { TasksListContextProvider } from "./context/TasksListContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <TasksListContextProvider>
            <App />
        </TasksListContextProvider>
    </React.StrictMode>
);
