const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 20000, // Increase to 20 seconds
      connectTimeoutMS: 20000 // Adjust the timeout if needed
    });

    mongoose.set('bufferTimeoutMS', 20000); // Set the buffer timeout to 20 seconds

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
