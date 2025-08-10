// src/Notification.jsx
import React from "react";

function Notification({ message, type }) {
  return (
    <div id="notification" className={`alert alert-${type}`}>
      {message}
    </div>
  );
}

export default Notification;
