import './App.css'
import React, { useState, useRef, createContext } from 'react';
import StopWatch from './components/Stopwatch/StopWatch';
import TaskList from './components/TaskList/TaskList';
import SessionsList from './components/Sessions/SessionsList/SessionsList';
import { SettingsProvider } from './components/SettingsProvider';
import Settings from './components/Settings/Settings';

const SessionsContext = createContext();
const TaskContext = createContext();

function App() {

  const [sessionsList, setSessionsList] = useState([]);
  const lastSessionId = useRef(0);
  const taskCompleted = useRef(0);
  
  return (
    <main>
      <SettingsProvider>
        <Settings />
        <TaskContext.Provider value={{ taskCompleted }}>
        <SessionsContext.Provider value={{ sessionsList, setSessionsList, lastSessionId }}>
        <StopWatch />
        <div className='task-session-container'>
          <TaskList />
          <SessionsList />
        </div>
        </SessionsContext.Provider>
        </TaskContext.Provider>
      </SettingsProvider>


    </main>

  )
}

export default App
export { SessionsContext }; 
export { TaskContext }
