import React from 'react';
import './SessionsList.css';
import SessionsItem from "../SessionsItem/SessionsItem";
import Button from "../../Button/Button"; // adjust path if needed
import { SessionsContext } from "../../../App";

export default function SessionsList() {
  const { sessionsList } = React.useContext(SessionsContext);
  const [open, setOpen] = React.useState(false);

  const wrapperRef = React.useRef(null);
  const btnRef = React.useRef(null);

  const toggle = () => setOpen(v => !v);

  // Close on outside click & Escape
  React.useEffect(() => {
    const onClick = (e) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const sessionElements = sessionsList.map((s) => (
    <SessionsItem
      key={s.id}
      duration={s.duration}
      id={s.id}
      breakTime={s.breakTime}
      taskCompleted={s.taskCompleted}
    />
  ));

  return (
    // If a parent flex is centering, add margin-left:auto to this element via CSS (see below)
    <section className="sessions-section" ref={wrapperRef}>
      <Button
        ref={btnRef}
        onClick={toggle}
        aria-expanded={open}
        aria-controls="sessions-dropdown"
      >
        Sessions
      </Button>

      {open && (
        <div
          id="sessions-dropdown"
          className="sessions-dropdown"
          role="dialog"
          aria-label="Session history"
        >
          <div className="sessions-list-header">
            <h1 className="sessions-title">Sessions</h1>
          </div>

          <div className="sessions-scroll">
            {sessionElements.length ? (
              sessionElements
            ) : (
              <p className="sessions-empty">No sessions yet</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
