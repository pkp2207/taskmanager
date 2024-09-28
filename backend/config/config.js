require('dotenv').config(); // Load environment variables from .env file

module.exports = {
    MONGO_URI: process.env.MONGO_URI || 'your_mongodb_connection_string',
    PORT: process.env.PORT || 5000,
};
