import React from 'react';
import { useContext } from 'react';
import { ToggleContext } from './Toggle';


export default function ToggleButton({children}) {
    const {toggle} = useContext(ToggleContext);
    return (
        <div onClick={toggle}>
            {children}
        </div>
    );
}