import React from "react";
import "./NotificationItem.css";

const NotificationItem = ({ message }: { message: string }) => {
  return <div className="notification-item">{message}</div>;
};

export default NotificationItem;
