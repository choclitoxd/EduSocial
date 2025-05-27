import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../ui/Navbar";
import "../ui/css/Navbar.css";
import { SuggestedUsers } from "../ui/SuggestedUsers";
import { AuthContext } from "../../context/AuthContext";

export const Header = ({ user, suggestedUsers: externalSuggestions }) => {
    const { postSuggestedUsers } = useContext(AuthContext);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const data = await postSuggestedUsers();
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

        if (user.isLoggedIn && !externalSuggestions) {
            fetchSuggestions();
        }
    }, [user.isLoggedIn, externalSuggestions]);

    // Usar las sugerencias externas si están disponibles
    useEffect(() => {
        if (externalSuggestions) {
            if (Array.isArray(externalSuggestions)) {
                setSuggestedUsers(externalSuggestions);
                setMessage("");
            } else if (externalSuggestions.message) {
                setMessage(externalSuggestions.message);
                setSuggestedUsers([]);
            }
        }
    }, [externalSuggestions]);

    return(
        <header className="container space">
            <Navbar user={user} />
            {user.isLoggedIn && <SuggestedUsers users={suggestedUsers} message={message} />}
        </header>
    );
};