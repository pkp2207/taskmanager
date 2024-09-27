import { useEffect, useState } from 'react';
import axios from 'axios';

interface Params {
    id: string;
}

interface Task {
    _id: string;
    title: string;
}

interface TaskList {
    title: string;
    tasks: Task[];
}

const TaskListDetail = ({ params }: { params: Params }) => {
    const { id } = params;
    const [taskList, setTaskList] = useState<TaskList | null>(null);

    useEffect(() => {
        const fetchTaskList = async () => {
            try {
                const response = await axios.get(`/api/tasklists/${id}`); // Adjust the API endpoint accordingly
                setTaskList(response.data);
            } catch (error) {
                console.error("Failed to fetch task list", error);
            }
        };

        fetchTaskList();
    }, [id]);

    if (!taskList) return <p>Loading...</p>;

    return (
        <div>
            <h1>{taskList.title}</h1>
            <ul>
                {taskList.tasks.map(task => (
                    <li key={task._id}>{task.title}</li>
                ))}
            </ul>
            <a href={`/tasklists/${id}/edit`}>Edit Task List</a>
        </div>
    );
};

export default TaskListDetail;
