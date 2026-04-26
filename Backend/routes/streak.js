import express from "express";
import Streak from "../models/Streak.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    let streak = await Streak.findOne({ userId });

    if (!streak) {
      return res.json({
        streakCount: 0,
        activeDays: [],
        lastActiveDate: null,
      });
    }

    res.json(streak);
  } catch (err) {
    res.status(500).json({ message: "Error fetching streak" });
  }
});

router.post("/update", async (req, res) => {
  try {
    const { userId } = req.body;

    const today = new Date().toISOString().split("T")[0];

    let streak = await Streak.findOne({ userId });

    if (!streak) {
      streak = new Streak({
        userId,
        streakCount: 1,
        activeDays: [today],
        lastActiveDate: today,
      });

      await streak.save();
      return res.json(streak);
    }

    // prevent duplicate same-day update
    if (streak.activeDays.includes(today)) {
      return res.json(streak);
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    //  streak logic
    if (streak.lastActiveDate === yesterdayStr) {
      streak.streakCount += 1; // continued streak
    } else {
      streak.streakCount = 1; // broken streak
    }

    streak.activeDays.push(today);
    streak.lastActiveDate = today;

    await streak.save();

    res.json(streak);

  } catch (err) {
    res.status(500).json({ message: "Error updating streak" });
  }
});

export default router;