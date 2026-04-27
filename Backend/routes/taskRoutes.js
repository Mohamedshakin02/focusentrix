// routes/taskRoutes.js
import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// GET all tasks for user
router.get("/:userId", async (req, res) => {
  const tasks = await Task.find({ userId: req.params.userId });
  res.json(tasks);
});

// ADD task
router.post("/", async (req, res) => {
  const { userId, label } = req.body;
  const task = await Task.create({ userId, label });
  res.json(task);
});

// TOGGLE task
router.put("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.done = !task.done;
  await task.save();
  res.json(task);
});

// DELETE task
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;