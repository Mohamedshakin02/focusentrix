import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/session.js";
import streakRoutes from "./routes/streak.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // frontend link
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/streak", streakRoutes);

export default app;