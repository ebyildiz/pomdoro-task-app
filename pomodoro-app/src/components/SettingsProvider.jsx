// src/context/SettingsContext.jsx
import React, { createContext, useContext, useMemo, useState } from "react";

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [workMinutes, setWorkMinutes] = useState(()=>25);
  const [breakMinutes, setBreakMinutes] = useState(()=>5);
  const [autoStart, setAutoStart] = useState(false);

  const value = {
      workMinutes,
      setWorkMinutes,
      breakMinutes,
      setBreakMinutes,
      autoStart,
      setAutoStart,
    }

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}


export {SettingsContext}