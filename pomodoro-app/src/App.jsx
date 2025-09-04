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
        <SessionsContext.Provider value={{ sessionsList, setSessionsList, lastSessionId }}>
          <div className='top-bar'>
            <SessionsList />
            <Settings />
          </div>

          <TaskContext.Provider value={{ taskCompleted }}>

            <StopWatch />
            <div className='task-session-container'>
              <TaskList />
            </div>

          </TaskContext.Provider>
        </SessionsContext.Provider>
      </SettingsProvider>
    </main>

  )
}

export default App
export { SessionsContext };
export { TaskContext }
