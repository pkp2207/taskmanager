import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Task {
  title: string;
  description: string;
  dueDate: string;
  status: string;
  assignedUserName: string;
}

export default function TaskDetailsPage() {
  const [task, setTask] = useState<Task | null>(null);
  const router = useRouter();
  const { id } = router.query; // Get task ID from URL

  useEffect(() => {
    async function fetchTask() {
      if (id) {
        const response = await axios.get(`/api/tasks/${id}`);
        setTask(response.data);
      }
    }
    fetchTask();
  }, [id]);

  return (
    <div className="p-6">
      {task ? (
        <div>
          <h1 className="text-2xl font-bold">{task.title}</h1>
          <p>Description: {task.description}</p>
          <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
          <p>Status: {task.status}</p>
          <p>Assigned to: {task.assignedUserName}</p>
        </div>
      ) : (
        <p>Loading task details...</p>
      )}
    </div>
  );
}
