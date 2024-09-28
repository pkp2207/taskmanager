const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust the path as necessary
require('dotenv').config();

// const users = [
//     {
//         username: 'admin',
//         email: 'admin@example.com',
//         password: 'password123',
//         role: 'Admin',
//     },
//     {
//         username: 'taskowner',
//         email: 'taskowner@example.com',
//         password: 'password123',
//         role: 'Task Owner',
//     },
//     {
//         username: 'assigneduser',
//         email: 'assigneduser@example.com',
//         password: 'password123',
//         role: 'Assigned User',
//     },
// ];
const users = [
    {
        username: 'pkp2207',
        email: 'piertotum22locomotor@gmail.com',
        password: 'Param47@',
        role: 'Admin',
    },
    
];
async function insertUsers() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Insert users
        await User.insertMany(users);
        console.log('Users inserted successfully!');

        // Close the connection
        await mongoose.connection.close();
    } catch (error) {
        console.error('Error inserting users:', error);
    }
}

insertUsers();
