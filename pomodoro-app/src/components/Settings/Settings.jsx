import React, { useRef } from "react";
import "./Settings.css";
import Button from "../Button/Button";
import { SettingsContext } from "../SettingsProvider";

export default function Settings() {
  const {
    workMinutes,
    setWorkMinutes,
    breakMinutes,
    setBreakMinutes,
    autoStart,
    setAutoStart,
  } = React.useContext(SettingsContext);

  const [showSettings, setShowSettings] = React.useState(false);

  const workRef = useRef(null);
  const breakRef = useRef(null);
  const wrapperRef = useRef(null);

  const toggleSettings = () => setShowSettings((v) => !v);

  // Close on outside click & Escape
  React.useEffect(() => {
    if (!showSettings) return;
    const onClick = (e) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target)) setShowSettings(false);
    };
    const onKey = (e) => e.key === "Escape" && setShowSettings(false);

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [showSettings]);

  const workMinuteChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (e.key === "Enter") {
      if (!isNaN(value) && value > 0 && value < 60) {
        setWorkMinutes(value);
      } else {
        alert("Please enter a valid positive number, less than 60");
      }
      workRef.current?.blur();
    }
  };

  const minuteChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (e.key === "Enter") {
      if (!isNaN(value) && value > 0 && value < 60) {
        setBreakMinutes(value);
      } else {
        alert("Please enter a valid positive number, less than 60");
      }
      breakRef.current?.blur();
    }
  };

  return (
    <section className="settings-section" ref={wrapperRef}>
      <Button onClick={toggleSettings} aria-expanded={showSettings} aria-controls="settings-dropdown">
        Settings
      </Button>

      {showSettings && (
        <section
          id="settings-dropdown"
          className="settings-container"
          role="dialog"
          aria-label="Settings"
        >
          <h2 className="settings-title">Settings</h2>

          <div className="settings-scroll">
            <div className="settings-grid">
              <label className="settings-label" htmlFor="workMin">
                Work Minutes:
              </label>
              <input
                id="workMin"
                className="settings-input"
                onKeyDown={workMinuteChange}
                defaultValue={workMinutes}
                ref={workRef}
                inputMode="numeric"
              />

              <label className="settings-label" htmlFor="breakMin">
                Break Minutes:
              </label>
              <input
                id="breakMin"
                className="settings-input"
                onKeyDown={minuteChange}
                defaultValue={breakMinutes}
                ref={breakRef}
                inputMode="numeric"
              />

              <span className="settings-label">Auto Start:</span>
              <input
                className="settings-checkbox"
                type="checkbox"
                checked={autoStart}
                onChange={() => setAutoStart(!autoStart)}
              />
            </div>
          </div>
        </section>
      )}
    </section>
  );
}
