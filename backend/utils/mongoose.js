import mongoose from 'mongoose';
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://admin:QpJunmfauh9EO4ck@september24cluster.u0akx.mongodb.net/?retryWrites=true&w=majority&appName=September24Cluster';

if (!MONGO_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // No need for useNewUrlParser and useUnifiedTopology
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;