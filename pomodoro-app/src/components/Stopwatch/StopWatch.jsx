import React, { useState, useEffect, useContext } from 'react';
import { SettingsContext } from '../SettingsProvider';
import './StopWatch.css';
import Toggle from '../Toggle/index';
import Button from '../Button/Button';
import { MdPlayCircleFilled } from "react-icons/md";
import { MdPlayCircleOutline } from "react-icons/md";
import { MdPauseCircleFilled } from "react-icons/md";
import { MdPauseCircleOutline } from "react-icons/md";



export default function StopWatch() {

    const [seconds, setSeconds] = useState(1490);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('work')
    const [playIcon, setPlayIcon] = useState(() => <MdPlayCircleOutline className='play-icon' />);
    const [pauseIcon, setPauseIcon] = useState(() => <MdPauseCircleOutline className='pause-icon' />);

    const {workMinutes, setWorkMinutes, breakMinutes, setBreakMinutes, autoSwitch, setAutoSwitch } = useContext(SettingsContext);

    const workSeconds = workMinutes * 60;
    const breakSeconds = breakMinutes * 60;



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