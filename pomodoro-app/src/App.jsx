import './App.css'
import React, { useState, useEffect } from 'react';
import StopWatch from './components/Stopwatch/StopWatch';
import TaskList from './components/TaskList/TaskList';
import SessionsList from './components/Sessions/SessionsList/SessionsList';
import { SettingsProvider } from './components/SettingsProvider';

function App() {

  return (
    <main>
      <SettingsProvider>
        <StopWatch />
        <div className='task-session-container'>
          <TaskList />
          <SessionsList />
        </div>

      </SettingsProvider>


    </main>

  )
}

export default App
