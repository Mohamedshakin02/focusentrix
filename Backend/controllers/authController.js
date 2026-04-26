import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// REGISTER
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
      password: hashed
    });

    const token = generateToken(user._id);

    const { password: _, ...safeUser } = user._doc;

    res.status(201).json({ user: safeUser, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
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

// GOOGLE LOGIN
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
                googleId: payload.sub
            });
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