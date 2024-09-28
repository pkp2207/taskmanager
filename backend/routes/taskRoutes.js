const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Create a new task
router.post('/', taskController.createTask);

// Get all tasks by task list ID
router.get('/task-list/:taskListId', taskController.getTasksByTaskList);

// Update a task by task ID
router.put('/:taskId', taskController.updateTask);

// Delete a task by task ID
router.delete('/:taskId', taskController.deleteTask);

module.exports = router;
