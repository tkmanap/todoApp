import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";

export type filterValuesType = "all" | "active" | "completed"
type todoListType = {
    id: string,
    title: string,
    filter: filterValuesType,
}

function App() {

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<todoListType>>([
        {id: todoListId1, title: "What to learn!", filter: "all"},
        {id: todoListId2, title: "Songs!", filter: "active"}
    ])

    let [tasksObj, setTasksObj] = useState({
        [todoListId1]: [
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Typescript", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "summertime sadness", isDone: true},
            {id: v1(), title: "born to die", isDone: false},
        ]
    })


    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId]
        tasksObj[todoListId] = tasks.filter(t => t.id !== id)
        setTasksObj({...tasksObj})
    }

    function changeFilter(value: filterValuesType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let task = tasks.find((t) => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todoListId]
        tasksObj[todoListId] = [task, ...tasks]
        setTasksObj({...tasksObj})
    }

    let removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter(t => t.id !== todoListId)
        setTodoLists(filteredTodoList)
        delete tasksObj[todoListId]
        setTasksObj(tasksObj)
    }

    function addTodoList(title: string) {
        let todoList: todoListType = {
            id: v1(),
            filter: "all",
            title: title
        }
        setTodoLists([todoList, ...todoLists])
        setTasksObj({
            ...tasksObj,
            [todoList.id]: []
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todoLists.map((tl) => {
                    let taskForTodoList = tasksObj[tl.id]
                    if (tl.filter === "completed") {
                        taskForTodoList = taskForTodoList.filter(tl => tl.isDone)
                    }
                    if (tl.filter === "active") {
                        taskForTodoList = taskForTodoList.filter(tl => !tl.isDone)
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
                        removeTodoList={removeTodoList}
                    />
                })
            }
        </div>
    );
}

export default App;
