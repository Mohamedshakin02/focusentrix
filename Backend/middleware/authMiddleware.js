import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token;

  // token from Authorization header (frontend)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // fallback (optional cookie support)
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // store user id inside request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalid" });
  }
};