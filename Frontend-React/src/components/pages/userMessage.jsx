import React, { useContext, useState, useEffect } from "react";
import { Header } from "./header";
import { StudentMessaging } from "../ui/StudentMessaging";
import { AuthContext } from "../../context/AuthContext";
import { LoginPrompt } from "../ui/LoginPrompt";

export const UserMessage = () => {
  const { user, getConversations, saveMessage } = useContext(AuthContext);
  const [conversations, setConversations] = useState({});
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sendingMessage, setSendingMessage] = useState(false);

  // Configurar el objeto de usuario basado en si hay un usuario autenticado o no
  const userData = user ? {
    isLoggedIn: true,
    name: user.nombre,
    username: user.correo
  } : {
    isLoggedIn: false,
    name: "Invitado",
    username: ""
  };

  // Procesar las conversaciones recibidas
  const processConversations = (conversationsData) => {
    const processedFriends = [];

    Object.entries(conversationsData).forEach(([friendEmail, messages]) => {
      if (messages && messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        
        processedFriends.push({
          id: friendEmail,
          name: lastMessage.nombreEmisor || friendEmail,
          avatar: lastMessage.nombreEmisor?.[0]?.toUpperCase() || 'U',
          status: 'online',
          lastMessage: lastMessage.contenido,
          lastMessageTime: new Date(lastMessage.fecha).toLocaleTimeString(),
          unreadCount: messages.filter(msg => !msg.leido).length
        });
      }
    });

    return processedFriends;
  };

  // Enviar un mensaje
  const handleSendMessage = async (recipientId, content) => {
    if (!content.trim() || sendingMessage) return;

    try {
      setSendingMessage(true);
      setError(null);

      const updatedMessages = await saveMessage(recipientId, content, true);

      // Actualizar conversaciones
      setConversations(prevConversations => ({
        ...prevConversations,
        [recipientId]: updatedMessages
      }));

      // Actualizar lista de amigos
      const updatedFriends = processConversations({
        [recipientId]: updatedMessages
      });

      if (updatedFriends.length > 0) {
        setFriends(prevFriends => {
          const newFriends = [...prevFriends];
          const index = newFriends.findIndex(f => f.id === recipientId);
          if (index !== -1) {
            newFriends[index] = updatedFriends[0];
          }
          return newFriends;
        });
      }

      return true;
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
      setError('No se pudo enviar el mensaje. Por favor, intenta de nuevo.');
      return false;
    } finally {
      setSendingMessage(false);
    }
  };

  // Cargar conversaciones
  useEffect(() => {
    const loadConversations = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const conversationsData = await getConversations();
        setConversations(conversationsData);
        setFriends(processConversations(conversationsData));
      } catch (err) {
        console.error('Error al cargar conversaciones:', err);
        setError('No se pudieron cargar las conversaciones. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, [user, getConversations]);

  // Si no hay usuario autenticado, mostrar prompt de login
  if (!user) {
    return (
      <div className="main-div">
        <Header user={userData} />
        <LoginPrompt />
      </div>
    );
  }

  return (
    <div className="main-div">
      <Header user={userData} />
      {loading ? (
        <div className="loading-container">
          <p>Cargando conversaciones...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Intentar de nuevo
          </button>
        </div>
      ) : (
        <StudentMessaging 
          friends={friends} 
          myConversation={conversations}
          currentUser={userData}
          onSendMessage={handleSendMessage}
          isSending={sendingMessage}
        />
      )}
    </div>
  );
};