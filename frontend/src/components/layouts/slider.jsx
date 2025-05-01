import React from "react";
import { Sliders } from "../IU/sliders";
export const Slider = ({classT, text}) => {
    return (
		<main className={classT}>
            <Sliders Title={text} ClassN="sliders" ClassH="text" className=""/>
    </main>
)}
