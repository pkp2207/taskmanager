require('dotenv').config(); // Load environment variables at the top
const mongoose = require('mongoose');
const User = require('./models/User');
const TaskList = require('./models/TaskList');
const Task = require('./models/Task');
const connectDB = require('./config/db');
const config = require('./config/config');

const seedData = async () => {
    await connectDB();

    // Clear existing data
    // await User.deleteMany({});
    // await TaskList.deleteMany({});
    // await Task.deleteMany({});

    // Create users
    const users = [
        // { username: 'admin', email: 'admin@example.com', password: 'admin123', role: 'Admin' },
        // { username: 'owner1', email: 'owner1@example.com', password: 'owner123', role: 'Task Owner' },
        // { username: 'owner2', email: 'owner2@example.com', password: 'owner123', role: 'Task Owner' },
        // { username: 'user1', email: 'user1@example.com', password: 'user123', role: 'Assigned User' },
        // { username: 'user2', email: 'user2@example.com', password: 'user123', role: 'Assigned User' }
         { username: 'Param', email: 'parampathak47@gmail.com', password: 'Param47@', role: 'Task Owner' },
         { username: 'pieloco', email: 'unacademybackups1@gmail.com', password: 'Param47@', role: 'Assigned User' },
         { username: 'pieloco2', email: 'jeetests01@gmail.com', password: 'Param47@', role: 'Assigned User' },
    ];

    const createdUsers = await User.insertMany(users);

    // Create task lists for each owner
    const taskLists = [
        { name: 'Task List 1', owner: createdUsers[0]._id, ownerName: createdUsers[0].username, tasks: [] },
        { name: 'Task List 2', owner: createdUsers[0]._id, ownerName: createdUsers[0].username, tasks: [] }
    ];

    const createdTaskLists = await TaskList.insertMany(taskLists);

    // Create tasks for each task list and assign them to users
    const tasks = [
        {
            title: 'Sample Task 5',
            description: 'This is a sample task for Task List 1.',
            dueDate: new Date(),
            assignedUser: createdUsers[1]._id,
            assignedUserName: createdUsers[1].username,
            taskList: createdTaskLists[0]._id
        },
        {
            title: 'Sample Task 6',
            description: 'Another task for Task List 1.',
            dueDate: new Date(),
            assignedUser: createdUsers[1]._id,
            assignedUserName: createdUsers[1].username,
            taskList: createdTaskLists[0]._id
        },
        {
            title: 'Sample Task 7',
            description: 'Task for Task List 2.',
            dueDate: new Date(),
            assignedUser: createdUsers[2]._id,
            assignedUserName: createdUsers[2].username,
            taskList: createdTaskLists[1]._id
        },
        {
            title: 'Sample Task 8',
            description: 'Another task for Task List 2.',
            dueDate: new Date(),
            assignedUser: createdUsers[2]._id,
            assignedUserName: createdUsers[2].username,
            taskList: createdTaskLists[1]._id
        }
    ];

    const createdTasks = await Task.insertMany(tasks);

    // Link tasks to their respective task lists
    createdTaskLists[0].tasks.push(createdTasks[0]._id, createdTasks[1]._id);
    createdTaskLists[1].tasks.push(createdTasks[2]._id, createdTasks[3]._id);

    await createdTaskLists[0].save();
    await createdTaskLists[1].save();

    console.log('Database seeded successfully with multiple users, task lists, and tasks!');
    process.exit();
};

seedData().catch(err => {
    console.error(err);
    process.exit(1);
});


