import React from "react";
import { useState } from "react";

import TaskItem from "../TaskItem/TaskItem";
import Button from "../Button/Button";
import "./TaskList.css";


export default function TaskList() {
    const [tasks, setTasks] = useState([<TaskItem tasks />]);
    const [taskInput, setTaskInput] = useState('');



    return (
        <section className="task-list-container">
            <div className="task-list-header">
                <h1>Tasks:</h1>
            </div>

            {tasks}
            <div className="add-task-button-container">
                <Button onClick={() => setTasks(prev => [...prev, <TaskItem tasks />])}>Add New Task</Button>
            </div>

        </section>

    )
}