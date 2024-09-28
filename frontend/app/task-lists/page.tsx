"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';

export default function TaskListsPage() {
  interface TaskList {
    _id: string; // MongoDB Object ID
    name: string;
    ownerName: string;
  }

  const { getToken, isSignedIn } = useAuth(); // Get authentication status and method to get token
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // State for error handling

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const fetchTaskLists = async () => {
      if (!isSignedIn) {
        if (isMounted) {
          setError('You need to be signed in to see your task lists.');
          setLoading(false);
        }
        return;
      }

      try {
        const token = await getToken(); // Get the JWT token from Clerk
        const response = await axios.get('/api/task-lists', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request
          },
        });

        if (isMounted) {
          setTaskLists(response.data); // Set task lists only if mounted
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
  }, [isSignedIn, getToken]); // Re-fetch if isSignedIn or getToken changes

  if (loading) {
    return <p>Loading...</p>; // Optional loading state
  }

  if (error) {
    return <p>{error}</p>; // Show error message if fetching fails
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
