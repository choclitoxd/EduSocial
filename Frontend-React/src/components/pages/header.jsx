import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../ui/Navbar";
import "../ui/css/Navbar.css";
import { SuggestedUsers } from "../ui/SuggestedUsers";
import { AuthContext } from "../../context/AuthContext";

export const Header = ({ user }) => {
    const { getSuggestedUsers } = useContext(AuthContext);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const data = await getSuggestedUsers();
                if (data.message) {
                    setMessage(data.message);
                    setSuggestedUsers([]);
                } else if (Array.isArray(data)) {
                    setSuggestedUsers(data);
                    setMessage("");
                }
            } catch (error) {
                setMessage("Error al cargar sugerencias");
                setSuggestedUsers([]);
            }
        };

        if (user.isLoggedIn) {
            fetchSuggestions();
        }
    }, [user.isLoggedIn]);

    return(
        <header className="container space">
            <Navbar user={user} />
            <SuggestedUsers users={suggestedUsers} message={message} />
        </header>
    );
};