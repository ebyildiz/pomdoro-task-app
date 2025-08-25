import React, {useRef} from "react";
import './Settings.css';
import Button from "../Button/Button";
import { SettingsContext } from "../SettingsProvider";

export default function Settings() {
    const { workMinutes, setWorkMinutes, breakMinutes, setBreakMinutes, autoStart, setAutoStart } = React.useContext(SettingsContext);
    const [showSettings, setShowSettings] = React.useState(false);

    const workRef = useRef(null);
    const breakRef = useRef(null);

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    }

    const workMinuteChange = (e) => {
        const value = parseInt(e.target.value);
        setWorkMinutes(value);
        if (e.key === 'Enter') {
            if (!isNaN(value) && value > 0) {
                setWorkMinutes(value);
            } else {
                alert("Please enter a valid positive number");
            }
            workRef.current.blur();
        }
    }

    const minuteChange = (e) => {
        const value = parseInt(e.target.value);
        setBreakMinutes(value);
        if (e.key === 'Enter') {
            if (!isNaN(value) && value > 0) {
                setBreakMinutes(value);
            } else {
                alert("Please enter a valid positive number");
            }
            breakRef.current.blur();
        }
    }
    return (
        <section className="settings-section">
            <Button onClick={toggleSettings}>Settings</Button>
            {showSettings &&
                <section className="settings-container">
                    <p>Work Minutes</p>
                    <input onKeyDown={workMinuteChange} defaultValue={workMinutes} ref={workRef}/>
                    <p>Break Minutes</p>
                    <input onKeyDown={minuteChange} defaultValue={breakMinutes} ref={breakRef}/>
                    <p>Auto Start</p>
                    <input type="checkbox" checked={autoStart} onChange={() => setAutoStart(!autoStart)} />
                </section>
            }
            </section>
    )


}