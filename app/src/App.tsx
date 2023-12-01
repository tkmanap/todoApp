import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./components/TodoList";
import {v1} from "uuid";

export type filterValuesType = "all" | "active" | "completed"
type todoListType = {
    id: string,
    title: string,
    filter: filterValuesType,
}

function App() {

    let [filter, setFilter] = useState<filterValuesType>("all")

    let [todoLists, setTodoLists] = useState<Array<todoListType>>([
        {id: v1(), title: "What to learn!", filter: "all"},
        {id: v1(), title: "Songs!", filter: "active"}
    ])

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Typescript", isDone: false}
    ])

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function changeFilter(value: filterValuesType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find((t) => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    return (
        <div className="App">
            {
                todoLists.map((tl) => {
                    let taskForTodoList = tasks
                    if (filter === "completed") {
                        taskForTodoList = tasks.filter(t => t.isDone)
                    }
                    if (filter === "active") {
                        taskForTodoList = tasks.filter(t => !t.isDone)
                    }
                    return <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={taskForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeStatus={changeStatus}
                        addTask={addTask}
                        filter={tl.filter}
                    />
                })
            }
        </div>
    );
}

export default App;
