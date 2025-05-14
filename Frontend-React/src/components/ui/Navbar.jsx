import React from "react";
import "./css/Navbar.css"
import {FaArchive,FaChalkboard,FaEllipsisH   ,FaUserFriends , FaKiwiBird, FaUserAstronaut,FaHome} from "react-icons/fa";
export const Navbar = () =>{
    return(
       <div className="navbar style-box space">
            <h1 className="logo"><FaKiwiBird  />EduSocial</h1>
            <nav className="align-itemsAll nav-direction">
                <a> 
                    <div className="subcontainer-nav trasiotion-action btn">
                        <div>
                            <h2><FaHome/></h2   >
                        </div>
                        <div className="important-tittle nav-text ">
                            <span>Home</span>
                        </div>
                    </div>
                </a>
                <a> 
                    <div className="subcontainer-nav trasiotion-action btn">
                        <div>
                            <h2><FaChalkboard /></h2>
                        </div>
                        <div className="nav-text">
                            <span>Panel de Estudiantes</span>
                        </div>
                    </div>
                </a>
                <a> 
                    <div className="subcontainer-nav trasiotion-action btn">
                        <div>
                            <h2><FaUserFriends/></h2>
                        </div>
                        <div className="nav-text">
                            <span>Grupo de estudio sugerido</span>
                        </div>
                    </div>
                </a>
                <a> 
                    <div className="subcontainer-nav trasiotion-action btn">
                        <div>
                            <h2><FaArchive/></h2>
                        </div>
                        <div className="nav-text">
                            <span>Mensajes</span>
                        </div>
                    </div>
                </a>
            </nav>
            {/* <div className="search-box">
                <input type="text" placeholder='Search' />
                <FaSearch />
            </div> */}
            <div className="div-user">
                <button role="button" className="transition-action btn" type="button">
                    <div className="profile-image">
                    {/* You can replace this with an actual image or keep the icon */}
                    <FaUserAstronaut className="user-icon" />
                    </div>
                    
                    <div className="profile-info">
                    <div className="display-name">
                        <span>Vector Ramirez</span>
                    </div>
                    <div className="username">
                        <span>@VictorR45687000</span>
                    </div>
                    </div>
                    
                    <div className="more-options">
                    {/* You can replace this with FaEllipsisH for three dots */}
                    <FaEllipsisH  />
                    </div>
                </button>
            </div>
       </div>
    )
}