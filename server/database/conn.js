
import mongoose from "mongoose";
import ENV from '../config.js';

async function connect() {
  console.log('Connecting to MongoDB Atlas...');

  try {
    mongoose.set('strictQuery', true);
    const db = await mongoose.connect(ENV.ATLAS_URI);
    console.log('Database connected successfully!');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    throw error; 
  }
}

export default connect;
