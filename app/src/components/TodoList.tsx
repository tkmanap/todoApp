import React, {useState} from "react";
import {filterValuesType} from "../App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: filterValuesType) => void
    addTask: (title: string) => void
}

export function TodoList(props: PropsType) {
    const [taskTitle, setTaskTitle] = useState("")

    const onNewChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            props.addTask(taskTitle)
            setTaskTitle("")
        }
    }

    const addTask = () => {
        props.addTask(taskTitle)
        setTaskTitle("")
    }
    const onAllClickHandler = () => props.changeFilter("all")
    const onCompletedClickHandler = () => props.changeFilter("completed")
    const onActiveClickHandler = () => props.changeFilter("active")
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"
                       value={taskTitle}
                       onChange={onNewChangeHandler}
                       onKeyDown={onKeyDownHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((t) => {
                        const onRemoveHandler = () => props.removeTask(t.id)
                        return <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}