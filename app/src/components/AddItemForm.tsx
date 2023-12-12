import React, {useState} from "react";

type addItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: addItemFormPropsType) {
    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)


    const addTask = () => {
        if (taskTitle.trim() !== "") {
            props.addItem(taskTitle.trim());
            setTaskTitle("")
        } else {
            setError("Field is required!")
        }
    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key == "Enter") {
            addTask()
        }
    }

    const onTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    return (
        <div>
            <div>
                <input type="text"
                       value={taskTitle}
                       onChange={onTitleChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div>{error}</div>}
            </div>
        </div>
    )
}