import React from 'react';
import './SessionsList.css';
import SessionsItem from "../SessionsItem/SessionsItem";
import {SessionsContext} from "../../../App";

export default function SessionsList() {
    const { sessionsList } = React.useContext(SessionsContext);
    const sessionElements = sessionsList.map((session)=> 
       <SessionsItem key={session.id} duration={session.duration} id={session.id} breakTime={session.breakTime} taskCompleted={session.taskCompleted}/>
    )

    return (
        <section className="sessions-list-container">
            <div className="sessions-list-header">
                <h1 className='sessions-title'>Sessions:</h1>
            </div>
            {sessionElements}
        </section>
    )

}