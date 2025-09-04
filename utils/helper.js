import jwt from "jsonwebtoken";

// Generate token
const generateToken = (user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// function to format book response with correct field
const formatBookResponse = (book) => {
  return {
    _id: book._id,
    title: book.title,
    author: book.author,
    genre: book.genre,
    price: book.price,
    inStock: book.inStock,
    createdAt: book.createdAt,
    updatedAt: book.updatedAt,
    createdBy: book.createdBy
  };
};

export { generateToken, verifyToken, formatBookResponse };