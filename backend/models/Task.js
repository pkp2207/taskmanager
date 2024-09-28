const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    dueDate: {
        type: Date,
        required: true
    },
    assignedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedUserName: {
        type: String,
        required: true  // This is likely where the issue is
    },
    taskList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskList',
        required: true
    }
});

module.exports = mongoose.model('Task', taskSchema);
