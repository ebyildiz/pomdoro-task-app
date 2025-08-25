import React, { useRef } from "react";
import { useState } from "react";

import TaskItem from "../TaskItem/TaskItem";
import Button from "../Button/Button";
import "./TaskList.css";


export default function TaskList() {
    const taskId = useRef(0);

    const [tasks, setTasks] = useState([{ id: taskId.current }]);

    const taskElements = tasks.map((task) => {
        if(task) {
            return <TaskItem key={task.id} id={task.id} setTasks={setTasks} />
        }
        else {
            return; 
        }
             
    })

    const addNewTask = () => {
        taskId.current += 1;
        setTasks(prev => [...prev, {id: taskId.current}]); 
    }

    return (
        <section className="task-list-container">
            <div className="task-list-header">
                <h1>Tasks:</h1>
            </div>
            {taskElements}
            <div className="add-task-button-container">
                <Button onClick={addNewTask}>Add New Task</Button>
            </div>

        </section>

    )
}