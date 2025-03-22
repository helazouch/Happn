import React from "react";
import { Bell } from "lucide-react";
import NotificationItem from "./NotificationItem";
import "./Notifications.css";

const Notifications = () => {
  const messages = [
    "Nouveau message reçu",
    "Mise à jour disponible",
    "Rappel : réunion à 14h",
    "Votre mot de passe expire bientôt",
    "Nouvelle demande de contact",
    "Notification personnalisée",
    "Encore une notification longue pour tester le scroll",
    "Test de scroll encore",
    "Une autre notification",
    "Scroll encore possible ici",
    "Et encore plus bas"
  ];

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <Bell size={20} />
        <h3>Notifications</h3>
      </div>
      <div className="notifications-scrollable">
        {messages.map((msg, index) => (
          <NotificationItem key={index} message={msg} />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
