import Button from "../Button/Button";
import Toggle from "../Toggle/index";
import { useRef, useState } from "react";
import React from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaRegCircle } from "react-icons/fa";
import "./TaskItem.css";
import { TaskContext } from "../../App"; // Adjust the import path as necessary
import { useContext } from "react";
import { MdDeleteForever } from "react-icons/md";


export default function TaskItem({id, setTasks}) {

    const { taskCompleted } = useContext(TaskContext);

    const [taskInput, setTaskInput] = useState('');
    const taskAreaRef = useRef(null);

    function onEnter(e) {
        if(e.key === "Enter"){
            e.preventDefault();
            taskAreaRef.current.blur();
        }
    }

    function onTaskComplete() {
        taskCompleted.current += 1;
    }

    function onTaskIncomplete() {
        taskCompleted.current -= 1;
        if (taskCompleted.current < 0) {
            taskCompleted.current = 0; // Prevent negative count
        }
    }

    return (
        <div className="task-container">

            <Toggle>
                <Toggle.Button>
                    <Button className="task-button" onClick={() => { }} style={{ backgroundColor: "transparent", border: "none", color: "#7972F8" }}>
                        <Toggle.On>
                            <IoIosCheckmarkCircle className="task-icon checked" onClick={onTaskIncomplete}/>
                        </Toggle.On>
                        <Toggle.Off>
                            <FaRegCircle className="task-icon empty" onClick={onTaskComplete}/>
                        </Toggle.Off>
                    </Button>
                </Toggle.Button>
            </Toggle>

            <textarea
                className="task-textarea"
                placeholder="Add a task..."
                value={taskInput}
                onChange={(e) => setTaskInput(e.currentTarget.value)}
                onKeyDown={onEnter}
                ref={taskAreaRef}
            />

            <Button className="delete-button" onClick={()=> {setTasks(prev => prev.map(
                (task) => task? (task.id === id ? null : task) : task
            ))}}>
                
                <MdDeleteForever className="delete-icon" />
            </Button>

        </div>
    )

}