import mongoose from "mongoose";

// Defines the schema for user sessions, tracking focus time and session counts
const sessionSchema = new mongoose.Schema({
  userId: String,
  date: String, // format: "2026-04-26"
  count: {
    type: Number,
    default: 0,
  },
  focusTime: { type: Number, default: 0 }
});

export default mongoose.model("Session", sessionSchema);