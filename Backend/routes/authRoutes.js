import express from "express";
import { signup, login, googleLogin, proSignup } from "../controllers/authController.js";

// Creates Express router
const router = express.Router();


// Defines authentication routes for signup, login, Google login, and pro upgrade
router.post("/signup", signup);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.post("/pro-signup", proSignup);


export default router;