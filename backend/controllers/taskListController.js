const TaskList = require('../models/TaskList'); // Adjust path as necessary

// Create a new task list
const createTaskList = async (req, res) => {
  const { name, ownerName } = req.body;

  // Validate input
  if (!name || !ownerName) {
    return res.status(400).json({ message: 'Name and ownerName are required.' });
  }

  try {
    const newTaskList = new TaskList({ name, ownerName });
    const savedTaskList = await newTaskList.save();
    return res.status(201).json(savedTaskList);
  } catch (error) {
    console.error('Error creating task list:', error);
    return res.status(500).json({ message: 'Error creating task list', error });
  }
};

// Get all task lists for a specific user
const getTaskLists = async (ownerName) => {
  try {
    const taskLists = await TaskList.find({ ownerName }); // Query by ownerName
    return taskLists;
  } catch (error) {
    console.error('Error fetching task lists:', error);
    throw new Error('Failed to fetch task lists');
  }
};



// Delete a task list
const deleteTaskList = async (req, res) => {
  const { taskListId } = req.body; // Assuming taskListId is sent in the body for deletion

  // Validate taskListId
  if (!taskListId) {
    return res.status(400).json({ message: 'TaskList ID is required.' });
  }

  try {
    const deletedTaskList = await TaskList.findByIdAndDelete(taskListId);
    if (!deletedTaskList) {
      return res.status(404).json({ message: 'Task list not found.' });
    }

    return res.status(200).json({ message: 'Task list deleted successfully.' });
  } catch (error) {
    console.error('Error deleting task list:', error);
    return res.status(500).json({ message: 'Error deleting task list', error });
  }
};
module.exports = {
  createTaskList,
  getTaskLists,
  deleteTaskList,
};