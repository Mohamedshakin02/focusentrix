import mongoose from "mongoose";

// Defines the schema for user tasks, allowing users to create and manage their focus tasks
const taskSchema = new mongoose.Schema({
  userId: String,
  label: String,
  done: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);