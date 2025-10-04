const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.DATABASE_URL;

if (!MONGODB_URI) {
  throw new Error('Please define DATABASE_URL environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("MongoDB connected successfully");
  } catch (err) {
    cached.promise = null;
    console.log("MongoDB connection error: ", err);
    throw err;
  }

  return cached.conn;
}

// Connect immediately for non-serverless, or call in each function for serverless
if (process.env.VERCEL) {
  // For Vercel, we'll connect in each route
  module.exports = connectDB;
} else {
  // For local development, connect immediately
  connectDB().catch(console.error);
  module.exports = connectDB;
}