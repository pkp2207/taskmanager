const mongoose = require('mongoose');

const taskListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
});

module.exports = mongoose.model('TaskList', taskListSchema);
