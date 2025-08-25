import React, { useState, useEffect, useContext, useRef } from 'react';
import { SettingsContext } from '../SettingsProvider';
import './StopWatch.css';
import Toggle from '../Toggle/index';
import Button from '../Button/Button';
import { MdPlayCircleFilled } from "react-icons/md";
import { MdPlayCircleOutline } from "react-icons/md";
import { MdPauseCircleFilled } from "react-icons/md";
import { MdPauseCircleOutline } from "react-icons/md";
import { SessionsContext } from '../../App'; // Adjust the import path as necessary
import { TaskContext } from '../../App'; // Adjust the import path as necessary

export default function StopWatch() {
    const [seconds, setSeconds] = useState(3);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('work')
    const [playIcon, setPlayIcon] = useState(() => <MdPlayCircleOutline className='play-icon' />);
    const [pauseIcon, setPauseIcon] = useState(() => <MdPauseCircleOutline className='pause-icon' />);

    const { taskCompleted } = useContext(TaskContext);

    const {workMinutes, breakMinutes, autoSwitch} = useContext(SettingsContext);

    const { setSessionsList, lastSessionId } = useContext(SessionsContext);

    const workSeconds = workMinutes * 60;
    const breakSeconds = breakMinutes * 60;



    function startTimer() {
        setIsRunning(true);
        setSeconds(mode === 'work' ? workSeconds : breakSeconds);
    }

    function stopTimer() {
        setIsRunning(false);
        setPauseIcon(<MdPauseCircleOutline className='pause-icon' />);
    }

    function resetTimer() {
        setIsRunning(false);
        setSeconds(mode === 'work' ? workSeconds : breakSeconds);
    }

    function resumeTimer() {
        setIsRunning(true);
        setPlayIcon(<MdPlayCircleOutline className='play-icon' />);
    }

    if (seconds === 0) {
        alert(`Time's up! You have completed your ${mode} session.`);
        setMode(prevMode => prevMode === 'work' ? 'break' : 'work');
        if (mode === 'break') {
            setSeconds(breakSeconds);
            lastSessionId.current += 1; // Increment the session ID
            setSessionsList(prevSessions => [...prevSessions, {duration:workMinutes, breakTime:breakMinutes, id:lastSessionId.current, taskCompleted:taskCompleted.current}]);
            taskCompleted.current = 0; 
        }
        if (autoSwitch) {
            setIsRunning(true);
            setSeconds(mode === 'work' ? breakSeconds : workSeconds);
        }
        else {
            setIsRunning(false);
            setSeconds(mode === 'work' ? breakSeconds : workSeconds);
        }
    }


    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);
        } else if (!isRunning && seconds !== workMinutes) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning])

    var date = new Date(0);
    date.setSeconds(seconds); // specify value for SECONDS here
    var timeString = date.toISOString().substring(14, 19);


    function hoverPlay() {
        setPlayIcon(<MdPlayCircleFilled className='play-icon' />);
    }

    function leavePLay() {
        setPlayIcon(<MdPlayCircleOutline className='play-icon' />);
    }

    function hoverPause() {
        setPauseIcon(<MdPauseCircleFilled className='pause-icon' />);
    }

    function leavePause() {
        setPauseIcon(<MdPauseCircleOutline className='pause-icon' />);
    }


    return (
        <>

            <div className='stopwatch-container'>
                <div className='control-mode-container'>
                    <h1 className='mode-title'>Mode: {mode[0].toUpperCase() + mode.slice(1)}</h1>

                    <div className='control-buttons'>
                        {!isRunning && seconds === 0 ?
                            <Button className="start-button" onClick={startTimer} >
                                Start
                            </Button>
                            :
                            <>
                                <Button className="reset-button" onClick={resetTimer} >
                                    Reset
                                </Button>

                                <Button
                                    className="playpause-button"
                                    onClick={isRunning ? stopTimer : resumeTimer}
                                    onMouseEnter={isRunning ? hoverPause : hoverPlay}
                                    onMouseLeave={isRunning ? leavePause : leavePLay}
                                    style={{ padding: "0px", backgroundColor: "transparent" }}
                                >
                                    {isRunning ? pauseIcon : playIcon}
                                </Button>
                            </>
                        }


                    </div>

                </div>
                <div className="timer-container">
                    <h1 className='timer-watch'>{timeString}</h1>
                </div>
            </div>

        </>

    )
}