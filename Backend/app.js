import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import streakRoutes from "./routes/streakRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Creates and configures the Express application
const app = express();

// Enables CORS for allowed frontend domains
app.use(cors({
  origin: ["http://localhost:5173", "https://focusentrix.vercel.app"], // frontend link
  credentials: true
}));

// Enables JSON body parsing and cookie handling
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups")
  next()
})

// Adds all API routes
app.use("/api/auth", authRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/streak", streakRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/user", userRoutes);

export default app;