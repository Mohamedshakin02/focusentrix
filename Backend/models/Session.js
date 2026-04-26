import mongoose from "mongoose";

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