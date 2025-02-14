import mongoose from 'mongoose'

if (!process.env.MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URL environment variable inside .env.local'
  )
}

const MONGODB_URL = process.env.MONGODB_URI

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  try {
    if (cached.conn) {
      console.log('Using cached MongoDB connection')
      return cached.conn
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      }

      mongoose.set('strictQuery', true)
      cached.promise = mongoose.connect(MONGODB_URL, opts)
        .then((mongoose) => {
          console.log('New MongoDB connection established')
          return mongoose
        })
        .catch((error) => {
          console.error('MongoDB connection error:', error)
          cached.promise = null
          throw error
        })
    }

    try {
      cached.conn = await cached.promise
    } catch (e) {
      cached.promise = null
      throw e
    }

    return cached.conn
  } catch (error) {
    console.error('Failed to connect to MongoDB:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    })
    throw error
  }
}

export default connectDB