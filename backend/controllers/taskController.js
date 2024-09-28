const Task = require('../models/Task');
const TaskList = require('../models/TaskList');

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, dueDate, status, assignedUserName, taskListId } = req.body;

  try {
    const taskList = await TaskList.findById(taskListId);
    if (!taskList) {
      return res.status(404).json({ message: 'Task list not found' });
    }

    const newTask = new Task({ title, description, dueDate, status, assignedUserName, taskList });
    const savedTask = await newTask.save();

    taskList.tasks.push(savedTask);
    await taskList.save();

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

// Get all tasks for a specific task list
exports.getTasksByTaskList = async (req, res) => {
  const { taskListId } = req.params;

  try {
    const tasks = await Task.find({ taskList: taskListId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};
