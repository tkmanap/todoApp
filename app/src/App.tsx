import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./components/TodoList";
import {v1} from "uuid";

export type filterValuesType = "all" | "active" | "completed"

function App() {

    let [filter, setFilter] = useState<filterValuesType>("all")

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Typescript", isDone: false}
    ])

    let task2 = [
        {id: v1(), title: "Summertime sadness", isDone: false},
        {id: v1(), title: "Born to die", isDone: true},
        {id: v1(), title: "Are you with me", isDone: false}
    ]

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function changeFilter(value: filterValuesType) {
        setFilter(value)
    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    let taskForTodoList = tasks
    if (filter === "completed") {
        taskForTodoList = tasks.filter(t => t.isDone === true)
    }
    if (filter === "active") {
        taskForTodoList = tasks.filter(t => t.isDone === false)
    }
    return (
        <div className="App">
            <TodoList title={"What to learn"}
                      tasks={taskForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
