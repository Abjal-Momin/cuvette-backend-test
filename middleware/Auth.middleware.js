import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Book from "../models/Book.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    if (authHeader.split(" ")[0] !== "Bearer") {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Check if the user is a book creator
    const { id } = req.params;
    if (id) {
      const book = await Book.findById(id);
      if (book.createdBy.email !== user.email) {
        return res.status(403).json({ message: "Unauthorized User" });
      }
    }

    // Passed to next controller
    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ message: "Error authenticating user", error });
  }
};

export default authMiddleware;
