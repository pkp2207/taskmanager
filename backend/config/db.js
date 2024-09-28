// backend/config/db.js
const mongoose = require('mongoose');
const config = require('./config'); // Assuming this is where you store env variables

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 20000, // Increase to 20 seconds
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
