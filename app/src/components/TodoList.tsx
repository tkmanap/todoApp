import React, {ChangeEvent, useState} from "react";
import {filterValuesType} from "../App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: filterValuesType, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    addTask: (title: string) => void
    filter: filterValuesType
}

export function TodoList(props: PropsType) {
    const [taskTitle, setTaskTitle] = useState("")

    const onTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            props.addTask(taskTitle)
            setTaskTitle("")
        }
    }

    const addTask = () => {
        if (taskTitle.trim() === ""){
            return;
        }
        props.addTask(taskTitle.trim())
        setTaskTitle("")
    }
    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"
                       value={taskTitle}
                       onChange={onTitleChangeHandler}
                       onKeyDown={onKeyDownHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((t) => {
                        const onRemoveHandler = () => props.removeTask(t.id)
                        const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked)
                        }
                        return <li key={t.id}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={onStatusChangeHandler}
                            />
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}