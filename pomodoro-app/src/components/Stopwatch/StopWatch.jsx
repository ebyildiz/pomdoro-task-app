import React, { useState, useEffect, useContext, useRef } from 'react';
import { SettingsContext } from '../SettingsProvider';
import './StopWatch.css';
import Button from '../Button/Button';
import {
  MdPlayCircleFilled,
  MdPlayCircleOutline,
  MdPauseCircleFilled,
  MdPauseCircleOutline
} from "react-icons/md";
import { SessionsContext } from '../../App'; // Adjust if needed
import { TaskContext } from '../../App';      // Adjust if needed
import clickSfx from './timer.mp3';           // your audio file

export default function StopWatch() {
  // contexts
  const { taskCompleted } = useContext(TaskContext);
  const { workMinutes, breakMinutes, autoStart } = useContext(SettingsContext);
  const { sessionsList, setSessionsList, lastSessionId } = useContext(SessionsContext);

  // coerce minutes -> seconds
  const workSeconds = (Number(workMinutes) || 0) * 60;
  const breakSeconds = (Number(breakMinutes) || 0) * 60;

  // state
  const [mode, setMode] = useState('work');              // 'work' | 'break'
  const [seconds, setSeconds] = useState(() => workSeconds);
  const [isRunning, setIsRunning] = useState(false);

  // UI icon states
  const [playIcon, setPlayIcon]   = useState(() => <MdPlayCircleOutline className='play-icon' />);
  const [pauseIcon, setPauseIcon] = useState(() => <MdPauseCircleOutline className='pause-icon' />);

  // guard: only count a session if we entered break automatically (i.e., work hit 0)
  const enteredBreakFromAutoRef = useRef(false);

  // session number (badge)
  const currentSessionNumber = (sessionsList?.length || 0) + 1;

  // ---- sound: play for ~2s max, no overlap
  const lastClickAudioRef = useRef(null);
  const playClick = (ms = 200) => {
    try {
      // stop any previous click sound
      if (lastClickAudioRef.current) {
        lastClickAudioRef.current.pause();
        lastClickAudioRef.current.src = '';
        lastClickAudioRef.current = null;
      }
      const a = new Audio(clickSfx);
      a.volume = 0.5;
      lastClickAudioRef.current = a;

      const stop = () => {
        try {
          a.pause();
          a.currentTime = 0;
        } catch {}
        if (lastClickAudioRef.current === a) {
          lastClickAudioRef.current = null;
        }
      };

      const t = setTimeout(stop, ms);
      a.addEventListener('ended', () => clearTimeout(t), { once: true });
      a.play().catch(() => {
        clearTimeout(t);
        stop();
      });
    } catch {}
  };

  // --- controls
  function startTimer() {
    setIsRunning(true);
    setSeconds(s => (s > 0 ? s : (mode === 'work' ? workSeconds : breakSeconds)));
    // no sound here per your request (only Play/Pause)
  }

  function stopTimer() {
    setIsRunning(false);
    setPauseIcon(<MdPauseCircleOutline className='pause-icon' />);
    playClick(); // 🔊 pause click (max ~2s)
  }

  function resetTimer() {
    setIsRunning(false);
    setSeconds(mode === 'work' ? workSeconds : breakSeconds);
    enteredBreakFromAutoRef.current = false;
    // no sound here per your request (only Play/Pause)
  }

  function resumeTimer() {
    setIsRunning(true);
    setPlayIcon(<MdPlayCircleOutline className='play-icon' />);
    playClick(); // 🔊 play click (max ~2s)
  }

  function toggleMode() {
    setIsRunning(false);
    setSeconds(prev => {
      const nextMode = mode === 'work' ? 'break' : 'work';
      // manual switch should not count as a session later
      enteredBreakFromAutoRef.current = false;
      setMode(nextMode);
      return nextMode === 'work' ? workSeconds : breakSeconds;
    });
    // optional: playClick();
  }

  // --- effects

  // 1) ticking interval
  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      setSeconds(prev => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  // 2) settings change => stop & reset
  useEffect(() => {
    setIsRunning(false);
    setSeconds(mode === 'work' ? workSeconds : breakSeconds);
    enteredBreakFromAutoRef.current = false;
  }, [workSeconds, breakSeconds, mode]);

  // 3) when seconds hits 0
  useEffect(() => {
    if (seconds !== 0) return;

    const finishedMode = mode;
    setIsRunning(false);

    // If break just finished, record the session ONLY if we entered break automatically
    if (finishedMode === 'break' && enteredBreakFromAutoRef.current) {
      if (lastSessionId?.current != null) lastSessionId.current += 1;
      setSessionsList(prev => [
        ...prev,
        {
          id: lastSessionId?.current ?? Date.now(),
          duration: workMinutes,
          breakTime: breakMinutes,
          taskCompleted: taskCompleted.current
        }
      ]);
      taskCompleted.current = 0;
      enteredBreakFromAutoRef.current = false;
    }

    // If work just finished naturally, we are auto-entering break
    if (finishedMode === 'work') {
      enteredBreakFromAutoRef.current = true;
    }

    const nextMode = finishedMode === 'work' ? 'break' : 'work';
    const nextSeconds = nextMode === 'work' ? workSeconds : breakSeconds;

    setMode(nextMode);
    setSeconds(nextSeconds);

    if (autoStart) setIsRunning(true);
  }, [
    seconds,
    mode,
    workSeconds,
    breakSeconds,
    autoStart,
    setSessionsList,
    workMinutes,
    breakMinutes,
    taskCompleted,
    lastSessionId
  ]);

  // --- UI helpers
  const date = new Date(0);
  date.setSeconds(Math.max(0, seconds));
  const timeString = date.toISOString().substring(14, 19);

  function hoverPlay()  { setPlayIcon(<MdPlayCircleFilled className='play-icon' />); }
  function leavePlay()  { setPlayIcon(<MdPlayCircleOutline className='play-icon' />); }
  function hoverPause() { setPauseIcon(<MdPauseCircleFilled className='pause-icon' />); }
  function leavePause() { setPauseIcon(<MdPauseCircleOutline className='pause-icon' />); }

  return (
    <div className='stopwatch-container'>
      {/* session badge in top-left */}
      <div className="session-badge" aria-live="polite" aria-atomic="true">
        #{currentSessionNumber}
      </div>

      <div className="timer-container">
        <h1 className='timer-watch'>{timeString}</h1>
      </div>

      <div className='control-mode-container'>
        <h1 className='mode-title' onClick={toggleMode}>
          Mode: {mode[0].toUpperCase() + mode.slice(1)}
        </h1>

        <div className='control-buttons'>
          {!isRunning && seconds === 0 ? (
            <Button className="start-button" onClick={startTimer}>
              Start
            </Button>
          ) : (
            <>
              <Button
                className="playpause-button"
                onClick={isRunning ? stopTimer : resumeTimer}
                onMouseEnter={isRunning ? hoverPause : hoverPlay}
                onMouseLeave={isRunning ? leavePause : leavePlay}
                style={{ padding: 0, backgroundColor: 'transparent' }}
              >
                {isRunning ? pauseIcon : playIcon}
              </Button>
              <Button className="reset-button" onClick={resetTimer}>
                Reset
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
