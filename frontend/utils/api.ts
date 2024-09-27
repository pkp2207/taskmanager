import axios from 'axios';

export const fetchTaskLists = async () => {
    const response = await axios.get('/api/tasklists');
    return response.data;
};

export const fetchTaskListById = async (id: string) => {
    const response = await axios.get(`/api/tasklists/${id}`);
    return response.data;
};

// Add more utility functions as needed
