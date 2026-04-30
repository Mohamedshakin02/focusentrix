import mongoose from "mongoose";

// Connects to MongoDB using the connection string from environment variables
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("DB error:", err.message);
    process.exit(1);
  }
};

export default connectDB;