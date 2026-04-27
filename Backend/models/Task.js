// models/Task.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: String,
  label: String,
  done: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);