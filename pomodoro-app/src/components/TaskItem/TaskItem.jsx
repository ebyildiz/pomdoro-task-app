import Button from "../Button/Button";
import Toggle from "../Toggle/index";
import { useRef, useState } from "react";
import React from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaRegCircle } from "react-icons/fa";
import "./TaskItem.css";


export default function TaskItem() {

    const [taskInput, setTaskInput] = useState('');
    const taskAreaRef = useRef(null);

    function onEnter(e) {
        if(e.key === "Enter"){
            e.preventDefault();
            taskAreaRef.current.blur();
        }

    }

    return (
        <div className="task-container">

            <Toggle>
                <Toggle.Button>
                    <Button className="task-button" onClick={() => { }} style={{ backgroundColor: "transparent", border: "none", color: "#7972F8" }}>
                        <Toggle.On>
                            <IoIosCheckmarkCircle className="task-icon checked" />
                        </Toggle.On>
                        <Toggle.Off>
                            <FaRegCircle className="task-icon empty" />
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

        </div>
    )

}