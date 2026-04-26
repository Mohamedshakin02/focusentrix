import express from "express";
import Session from "../models/Session.js";

const router = express.Router();

// helper to get today's date
const getToday = () => new Date().toISOString().split("T")[0];

/* increase session count */
router.post("/increment", async (req, res) => {
  try {
    const { userId, focusTime } = req.body
    const today = new Date().toISOString().split("T")[0]

    const session = await Session.findOneAndUpdate(
      { userId, date: today },
      {
        $inc: {
          count: 1,
          focusTime: focusTime || 0 // focus time
        }
      },
      { upsert: true, new: true }
    )

    res.json(session)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
/* get today's sessions */
router.get("/today/:userId", async (req, res) => {
  const { userId } = req.params;
  const date = getToday();

  const session = await Session.findOne({ userId, date });

  res.json({
    count: session ? session.count : 0,
    focusTime: session ? session.focusTime : 0
  });
});

export default router;