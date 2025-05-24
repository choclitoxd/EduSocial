import React from "react";
import { Header } from "./header";
import { StudentMessaging } from "../ui/StudentMessaging";

export const UserMessage = () =>{
    const user = {
        isLoggedIn: true,
        name: "Vector Ramirez",
        username: "VictorR45687000"
    };

    const friends = ([{
      id: 1,
      name: 'Ana García',
      avatar: 'A',
      status: 'online',
      lastMessage: 'Perfecto, nos vemos mañana para estudiar',
      lastMessageTime: '10:30',
      unreadCount: 2,
      subject: 'Matemáticas'
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      avatar: 'C',
      status: 'away',
      lastMessage: '¿Tienes los apuntes de la clase de ayer?',
      lastMessageTime: '09:15',
      unreadCount: 0,
    },
    {
      id: 3,
      name: 'Elena Martínez',
      avatar: 'E',
      status: 'online',
      lastMessage: 'Gracias por la ayuda con el proyecto',
      lastMessageTime: 'Ayer',
      unreadCount: 1,
    },
    {
      id: 4,
      name: 'José López',
      avatar: 'J',
      status: 'offline',
      lastMessage: 'Enviado',
      lastMessageTime: '2 días',
      unreadCount: 0,
    },
    {
      id: 5,
      name: 'María Fernández',
      avatar: 'M',
      status: 'online',
      lastMessage: 'El código que me pasaste funciona perfecto',
      lastMessageTime: '14:22',
      unreadCount: 3,
    }]
  );

  const myConversations = ({
     1: [
      { id: 1, senderId: 1, text: 'Hola! ¿Cómo vas con los ejercicios de cálculo?', time: '10:00', isOwn: false },
      { id: 2, senderId: 'me', text: 'Bien, aunque tengo dudas con las derivadas parciales', time: '10:05', isOwn: true },
      { id: 3, senderId: 1, text: 'Te puedo ayudar, ¿nos vemos mañana en la biblioteca?', time: '10:15', isOwn: false },
      { id: 4, senderId: 'me', text: 'Perfecto, ¿a las 3 PM te parece bien?', time: '10:20', isOwn: true },
      { id: 5, senderId: 1, text: 'Perfecto, nos vemos mañana para estudiar', time: '10:30', isOwn: false }
    ],
    2: [
      { id: 6, senderId: 2, text: '¿Tienes los apuntes de la clase de ayer?', time: '09:15', isOwn: false },
      { id: 7, senderId: 'me', text: 'Sí, te los paso por aquí', time: '09:20', isOwn: true }
    ],
    3: [
      { id: 8, senderId: 3, text: 'Gracias por la ayuda con el proyecto', time: 'Ayer', isOwn: false }
    ]
  });

  return(
    <div className="main-div">
        <Header user={user} />
        <StudentMessaging  friends={friends} myConversation={myConversations} />
    </div>
  )
}