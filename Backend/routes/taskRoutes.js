// routes/taskRoutes.js
import express from "express";
import Task from "../models/Task.js";

// Creates Express router
const router = express.Router();

// Route to get all tasks for a user
router.get("/:userId", async (req, res) => {
  const tasks = await Task.find({ userId: req.params.userId });
  res.json(tasks);
});


// Route to create a new task for a user
router.post("/", async (req, res) => {
  const { userId, label } = req.body;
  const task = await Task.create({ userId, label });
  res.json(task);
});


// Route to toggle task completion status
router.put("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.done = !task.done;
  await task.save();
  res.json(task);
});


// Route to delete a task
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;