import React from "react";
import { Link } from "react-router-dom"; // O usa <a> si no usas react-router

export const NavItem = ({ icon, label, to = "#" }) => {
  return (
    <Link to={to} className="nav-item trasiotion-action btn ">
      <div>
        <h2>{icon}</h2>
      </div>
      <div className={`nav-text ${label === "Home" ? "important-tittle" : ""}`}>
        <span>{label}</span>
      </div>
    </Link>
  );
};

