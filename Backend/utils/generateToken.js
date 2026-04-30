import jwt from "jsonwebtoken";

// Generates a JWT token for a user ID with 7-day expiration using the JWT secret
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};