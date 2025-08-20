import React from "react";
import { ToggleContext } from "./Toggle";
import { useContext } from "react";

export default function ToggleOff({children}) {
    const {on} = useContext(ToggleContext);

    return(
        !on && children
    )




}