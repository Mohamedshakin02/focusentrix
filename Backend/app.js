import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/session.js";
import streakRoutes from "./routes/streak.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://focusentrix.vercel.app"], // frontend link
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/streak", streakRoutes);
app.use("/api/tasks", taskRoutes);

export default app;