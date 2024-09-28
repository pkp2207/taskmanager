import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function NotificationsPage() {
  interface Notification {
    id: number;
    message: string;
  }

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    async function fetchNotifications() {
      const response = await axios.get('/api/notifications');
      setNotifications(response.data);
    }
    fetchNotifications();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Notifications</h1>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className="border p-2 mt-2">
              <p>{notification.message}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications yet.</p>
      )}
    </div>
  );
}
