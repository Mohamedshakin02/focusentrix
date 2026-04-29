import express from "express";
import User from "../models/User.js";

const router = express.Router();

// upgrade to pro
router.post("/upgrade", async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isPro) {
      return res.status(400).json({ message: "Already Pro" });
    }

    user.isPro = true;
    await user.save();

    res.json({ message: "Pro activated", user });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;