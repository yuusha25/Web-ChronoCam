import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // Check for session cookie instead of Authorization header
    const token = req.cookies.session; // Make sure you're using cookie-parser middleware

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired session" });
  }
};
