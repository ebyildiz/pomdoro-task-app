import React from 'react';
import './SessionsList.css';
import {useState} from "react"
import SessionsItem from "../SessionsItem/SessionsItem";

export default function SessionsList() {

    const [sessions, setSessions] = useState([<SessionsItem id={1}/>]);

    return (
        <section className="sessions-list-container">
            <div className="sessions-list-header">
                <h1 className='sessions-title'>Sessions:</h1>
            </div>
            {sessions}
        </section>
    )

}