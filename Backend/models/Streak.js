import mongoose from "mongoose";

const streakSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },

  streakCount: {
    type: Number,
    default: 0,
  },

  activeDays: {
    type: [String], // stores dates like "2026-04-26"
    default: [],
  },

  lastActiveDate: {
    type: String,
    default: null,
  },
});

export default mongoose.model("Streak", streakSchema);