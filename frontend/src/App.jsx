import "./App.css";
import TasksView from './components/TasksView'
import NavbarComponent from "./components/NavbarComponent";

function App() {
    return (
        <div>
            <NavbarComponent />
            <TasksView />
        </div>
    );
}

export default App;
