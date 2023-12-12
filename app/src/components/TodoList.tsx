import React, {ChangeEvent} from "react";
import {filterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: filterValuesType, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    filter: filterValuesType
    removeTodoList: (todoListId: string) => void
}

export function TodoList(props: PropsType) {
    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <button onClick={removeTodoList}>x</button>
            </div>

            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map((t) => {
                        const onRemoveHandler = () => props.removeTask(t.id, props.id)
                        const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
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
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}