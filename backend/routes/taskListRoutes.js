const express = require('express');
const router = express.Router();
const taskListController = require('../controllers/taskListController');

// Create a new task list
router.post('/', taskListController.createTaskList);

// Get all task lists
router.get('/', taskListController.getTaskLists);

// Delete a task list by ID
router.delete('/:taskListId', taskListController.deleteTaskList);

module.exports = router;
