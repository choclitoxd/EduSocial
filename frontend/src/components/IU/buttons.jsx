import  React from "react";
import "./css/styleB.css";

export const Button = ({text, event, types}) =>{
    return (
        <button className="lineas" type={types} onClick={event} >{text}</button>
    );
}