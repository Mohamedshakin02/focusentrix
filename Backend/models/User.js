import mongoose from "mongoose";

// Defines the schema for user accounts, including authentication and subscription information
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, default: null },
  googleId: String,
  isPro: {
    type: Boolean,
    default: false
  },
}, { timestamps: true },

);

export default mongoose.model("User", userSchema);