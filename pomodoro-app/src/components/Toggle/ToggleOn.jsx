import React from "react";
import { ToggleContext } from "./Toggle";
import { useContext } from "react";

export default function ToggleOn({children}) {
    const {on} = useContext(ToggleContext);

    return(
        on && children
    )

}