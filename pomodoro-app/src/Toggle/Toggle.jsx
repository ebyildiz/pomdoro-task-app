import React from "react";
import { useState } from "react";
import { createContext } from "react";

const ToggleContext = createContext();

export default function Toggle({children}) {
    const [on, setOn] = useState(false);
    function toggle() {
        setOn(prev=>!prev)
    }

    return (
        <ToggleContext.Provider value={{ on, toggle }}>
            {children}
        </ToggleContext.Provider>
    );
}

export {ToggleContext};