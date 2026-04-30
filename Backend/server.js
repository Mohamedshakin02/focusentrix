import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Loads environment variables from .env file
dotenv.config();

// Connects to the MongoDB database
connectDB();

// Sets server port from environment variable or defaults to 5000
const PORT = process.env.PORT || 5000;

// Starts the Express server and listens for incoming requests
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});