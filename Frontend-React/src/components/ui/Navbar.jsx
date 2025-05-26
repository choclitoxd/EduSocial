import React  from "react";
import "./css/Navbar.css";
import { NavItem } from "./NavItem";
import { UserCard } from "./UserCard";
import {
  FaArchive,
  FaChalkboard,
  FaUserFriends,
  FaKiwiBird,
  FaHome
} from "react-icons/fa";

export const Navbar = ({ user }) => {

  return (
    <div className="navbar style-box space">
      <h1 className="logo">
        <FaKiwiBird /> EduSocial
      </h1>

      <nav className="align-itemsAll nav-direction">
        <NavItem icon={<FaHome />} label="Home" to="/" />
       {user.isLoggedIn ? (
            <>
                <NavItem icon={<FaChalkboard />} label="Panel de Estudiantes" to="/user" />
                <NavItem icon={<FaUserFriends />} label="Grupo de estudio sugerido" to="/group" />
                <NavItem icon={<FaArchive />} label="Mensajes" to="/message" />
            </>
        ) : null}
       
      </nav>

      {user.isLoggedIn ? (
        <UserCard hasProfile={true} name={user.name} username={user.username} />
      ) : (
        <UserCard hasProfile={false} />
      )}
    </div>
  );
};