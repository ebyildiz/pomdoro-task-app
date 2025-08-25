
import React from "react"
import "./SessionsItem.css";

export default function SessionsItem({ id, duration, breakTime, taskCompleted}) {
    return (
        <section className="session-item">
            <h1>Session {id}</h1>
            <div className="session-details">
            <p>Work Time: {duration}</p>
            <p>Break Time: {breakTime}</p>
            <p>Tasks Completed: {taskCompleted}</p>

            </div>
        </section>

    )
}