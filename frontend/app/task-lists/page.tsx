"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';

export default function TaskListsPage() {
  interface TaskList {
    _id: string; // MongoDB Object ID
    name: string;
    ownerName: string; // This will be fetched from the database
  }

  const { getToken, isSignedIn } = useAuth();
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchTaskLists = async () => {
      if (!isSignedIn) {
        if (isMounted) {
          setError('You need to be signed in to see your task lists.');
          setLoading(false);
        }
        return;
      }

      try {
        const token = await getToken();
        const response = await axios.get('/api/task-lists', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token
          },
        });

        if (isMounted) {
          setTaskLists(response.data);
        }
      } catch (err) {
        console.error('Error fetching task lists:', err);
        if (isMounted) {
          setError('Failed to fetch task lists. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTaskLists();

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, [isSignedIn, getToken]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Task Lists</h1>
      {taskLists.length > 0 ? (
        <ul>
          {taskLists.map((taskList) => (
            <li key={taskList._id} className="border p-2 mt-2">
              <h2>{taskList.name}</h2>
              <p>Owner: {taskList.ownerName}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no task lists yet.</p>
      )}
    </div>
  );
}
