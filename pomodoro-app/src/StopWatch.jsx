import React, { useState, useEffect, use } from 'react';
import './StopWatch.css';
import Toggle from './Toggle/index';
import Button from './Button';
import { MdPlayCircleFilled } from "react-icons/md";
import { MdPlayCircleOutline } from "react-icons/md";
import { MdPauseCircleFilled } from "react-icons/md";
import { MdPauseCircleOutline } from "react-icons/md";



export default function StopWatch() {

    const [seconds, setSeconds] = useState(1490);
    const [isRunning, setIsRunning] = useState(false);
    const [workSeconds, setWorkSeconds] = useState(1500);
    const [breakSeconds, setBreakSeconds] = useState(300);
    const [mode, setMode] = useState('work')
    const [autoSwitch, setAutoSwitch] = useState(true);
    const [playIcon, setPlayIcon] = useState(()=><MdPlayCircleOutline className='play-icon' />);
    const [pauseIcon, setPauseIcon] = useState(()=><MdPauseCircleOutline className='pause-icon' />);


    function startTimer() {
        setIsRunning(true);
        setSeconds(0);
    }

    function stopTimer() {
        setIsRunning(false);
        setPauseIcon(<MdPauseCircleOutline className='pause-icon' />);
    }

    function resetTimer() {
        setIsRunning(false);
        setSeconds(0);
    }

    function resumeTimer() {
        setIsRunning(true);
        setSeconds(prevSeconds => prevSeconds);
        setPlayIcon(<MdPlayCircleOutline className='play-icon' />);
    }

    let endSeconds;
    if (mode === 'work') {
        endSeconds = workSeconds;
    }
    else {
        endSeconds = breakSeconds;
    }

    if (seconds === endSeconds) {
        alert(`Time's up! You have completed your ${mode} session.`);
        setMode(prevMode => prevMode === 'work' ? 'break' : 'work');
        if (autoSwitch) {
            startTimer();
        }
        else {
            resetTimer();
        }
    }


    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        } else if (!isRunning && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning])

    var date = new Date(0);
    date.setSeconds(seconds); // specify value for SECONDS here
    var timeString = date.toISOString().substring(11, 19);


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
                <div className='control-buttons'>
                    <h1>Mode: {mode[0].toUpperCase() + mode.slice(1)}</h1>
                    <Toggle>
                        <Toggle.Off>
                        <div className='after-pause-container'>
                        {seconds === 0 && !isRunning?
                                <Toggle.Button>
                                    <Button className='start-button' onClick={startTimer} >Start</Button>
                                </Toggle.Button>
                                :
                                <>
                                <Button className='reset-button' onClick={resetTimer}>Reset</Button>
                                    <Toggle.Button>
                                        <Button className='resume-button' onClick={resumeTimer} onMouseEnter={hoverPlay} onMouseLeave={leavePLay} style={{padding:"0px", backgroundColor:"transparent"}}>
                                            {playIcon}
                                        </Button>
                                    </Toggle.Button>
                                </>
                        }
                            </div>
                            
                        </Toggle.Off>
                        <Toggle.On>
                                

                                <Toggle.Button>
                                    <Button className='stop-button' onClick={stopTimer} onMouseEnter={hoverPause} onMouseLeave={leavePause} style={{padding:"0px", backgroundColor:"transparent"}}>
                                        {pauseIcon}
                                    </Button>
                                </Toggle.Button>
                            
                        </Toggle.On>
                    </Toggle>
                </div>
                <div className="timer-container">
                    <h1 className='timer-watch'>{timeString}</h1>
                </div>

            </div>

        </>

    )
}