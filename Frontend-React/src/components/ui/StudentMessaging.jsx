import React, { useState, useRef, useEffect } from 'react';
import './css/Message.css'

export const StudentMessaging = ({friends, myConversation}) => {
    const [activeChat, setActiveChat] = useState(null);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const messagesEndRef = useRef(null);
    const [contacts] = useState(friends)
    const [conversations, setConversations] = useState(myConversation)

    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        scrollToBottom();
    }, [conversations, activeChat]);

    const sendMessage = () => {
        if (message.trim() && activeChat) {
            const newMessage = {
                id: Date.now(),
                senderId: 'me',
                text: message,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isOwn: true
            };

            setConversations(prev => ({
                ...prev,
                [activeChat]: [...(prev[activeChat] || []), newMessage]
            }));

            setMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'online': return '#4CAF50';
            case 'away': return '#FFA500';
            case 'offline': return '#757575';
            default: return '#757575';
        }
    };
    return (
        <div className="messaging-container">
            <div className="contacts-sidebar">
                <div className="sidebar-header">
                    <h2 className="sidebar-title">
                        💬 Mensajes
                    </h2>
                    <div className="search-container">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Buscar contactos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="contacts-list">
                    {filteredContacts.map(contact => (
                        <div
                            key={contact.id}
                            className={`contact-item ${activeChat === contact.id ? 'active' : ''}`}
                            onClick={() => setActiveChat(contact.id)}
                        >
                            <div className="contact-avatar">
                                {contact.avatar}
                                <div
                                    className="status-indicator"
                                    style={{ backgroundColor: getStatusColor(contact.status) }}
                                />
                            </div>
                            <div className="contact-info">
                                <p className="contact-name">{contact.name}</p>
                                <p className="contact-last-message">{contact.lastMessage}</p>
                            </div>
                            <div className="contact-meta">
                                <span className="contact-time">{contact.lastMessageTime}</span>
                                {contact.unreadCount > 0 && (
                                    <span className="unread-badge">{contact.unreadCount}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Área de Chat */}
            <div className="chat-container">
                {activeChat ? (
                    <>
                        {/* Header del Chat */}
                        <div className="chat-header">
                            <div className="chat-avatar">
                                {contacts.find(c => c.id === activeChat)?.avatar}
                                <div
                                    className="status-indicator"
                                    style={{ backgroundColor: getStatusColor(contacts.find(c => c.id === activeChat)?.status) }}
                                />
                            </div>
                            <div className="chat-info">
                                <h3>{contacts.find(c => c.id === activeChat)?.name}</h3>
                                <p className="chat-status">
                                    {contacts.find(c => c.id === activeChat)?.status === 'online' ? 'En línea' :
                                        contacts.find(c => c.id === activeChat)?.status === 'away' ? 'Ausente' : 'Sin conexión'}
                                </p>
                            </div>
                        </div>

                        {/* Mensajes */}
                        <div className="chat-messages">
                            {(conversations[activeChat] || []).map(msg => (
                                <div key={msg.id} className={`message ${msg.isOwn ? 'own' : ''}`}>
                                    <div className={`message-bubble ${msg.isOwn ? 'own' : 'other'}`}>
                                        {msg.text}
                                        <div className={`message-time ${msg.isOwn ? 'own' : 'other'}`}>
                                            {msg.time}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input de Mensaje */}
                        <div className="chat-input-container">
                            <div className="chat-input-wrapper">
                                <textarea
                                    className="chat-input"
                                    placeholder="Escribe un mensaje..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    rows="1"
                                />
                                <button
                                    className="send-button"
                                    onClick={sendMessage}
                                    disabled={!message.trim()}
                                >
                                    ➤
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="empty-chat">
                        <h3>💬</h3>
                        <h3>Selecciona una conversación</h3>
                        <p>Elige un contacto de la lista para comenzar a chatear</p>
                    </div>
                )}
            </div>
        </div>
    );
};