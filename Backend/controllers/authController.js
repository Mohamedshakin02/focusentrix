import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { OAuth2Client } from "google-auth-library";
import Task from "../models/Task.js";


// Creates a Google OAuth2 client using the Google Client ID from environment variables
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


// Initialize default tasks for new users
const createDefaultTasks = async (userId) => {
  const defaultTasks = [
    { label: 'Finding color palette' },
    { label: 'Exploring UI designs' },
    { label: 'Start making initial design' },
    { label: 'Make it responsive design' },
  ];

  return Promise.all(
    defaultTasks.map(task =>
      Task.create({
        userId,
        label: task.label,
        done: false,
      })
    )
  );
};


//  register (free version) ---
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
      isPro: false 
    });

    await createDefaultTasks(user._id);

    const token = generateToken(user._id);
    const { password: _, ...safeUser } = user._doc;

    res.status(201).json({ user: safeUser, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// login (free + pro) ---
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = generateToken(user._id);
    const { password: _, ...safeUser } = user._doc;

    res.json({ user: safeUser, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Google Login (free + pro) ---
export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = await User.create({
        name: payload.name,
        email: payload.email,
        googleId: payload.sub,
        isPro: false
      });
      await createDefaultTasks(user._id);
    } else {
      if (!user.googleId) {
        user.googleId = payload.sub;
        await user.save();
      }
    }

    const token = generateToken(user._id);
    const { password: _, ...safeUser } = user._doc;
    res.json({ user: safeUser, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Pro Upgrade (free -> pro, or new pro user) ---
export const proSignup = async (req, res) => {
  try {
    const { name, email, password, googleId } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      // Logic for existing users
      if (user.isPro) {
        return res.status(400).json({ 
          message: "You are already a Pro user. Please login on the Auth page." 
        });
      }

      // If user has a password, they MUST provide the correct one to upgrade
      if (user.password && password) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: "Incorrect password for this account. Use your existing password to upgrade." });
        }
      }
      
      // Upgrade existing free user to Pro
      user.isPro = true;
      if (password && !user.password) {
        user.password = await bcrypt.hash(password, 10);
      }
      if (googleId) user.googleId = googleId;
      await user.save();

    } else {
      // Logic for brand new Pro user
      const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        googleId,
        isPro: true
      });
      
      await createDefaultTasks(user._id);
    }

    const token = generateToken(user._id);
    const { password: _, ...safeUser } = user._doc;
    
    res.status(201).json({ 
      user: safeUser, 
      token, 
      message: "Pro Upgrade Successful!" 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};