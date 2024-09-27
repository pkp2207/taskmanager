import { useEffect, useState } from 'react';
import axios from 'axios';

interface TaskList {
    _id: string;
    title: string;
}

const TaskLists = () => {
    const [taskLists, setTaskLists] = useState<TaskList[]>([]);

    useEffect(() => {
        const fetchTaskLists = async () => {
            try {
                const response = await axios.get('/api/tasklists'); // Adjust the API endpoint accordingly
                setTaskLists(response.data);
            } catch (error) {
                console.error("Failed to fetch task lists", error);
            }
        };

        fetchTaskLists();
    }, []);

    return (
        <div>
            <h1>Your Task Lists</h1>
            <ul>
                {taskLists.map(list => (
                    <li key={list._id}>
                        <a href={`/tasklists/${list._id}`}>{list.title}</a>
                    </li>
                ))}
            </ul>
            <a href="/tasklists/create">Create New Task List</a>
        </div>
    );
};

export default TaskLists;
