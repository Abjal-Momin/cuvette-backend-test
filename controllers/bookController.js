import Book from "../models/Book.js";

const createBook = async (req, res) => {
  try {
    const { title, author, genre, price, inStock } = req.body;

    if (!title || !author || !genre || !price || !inStock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (typeof price !== "number" || typeof inStock !== "boolean") {
      return res
        .status(400)
        .json({ message: "Price & inStock must be a number" });
    }

    const existingBookwithTitle = await Book.findOne({
      title: title.replace(/\s+/g, " "),
    });

    if (existingBookwithTitle) {
      return res
        .status(400)
        .json({ message: "Book with this title already exists" });
    }
    
    // Comes From Middleware
    const user = req.user;

    const book = new Book({
      title: title.replace(/\s+/g, " "),
      author: author.replace(/\s+/g, " "),
      genre: genre.replace(/\s+/g, " "),
      price: price,
      inStock: inStock,
      createdBy: {
        name: user.name,
        email: user.email,
      },
    });

    await book.save();

    res.status(201).json({ message: "Book created successfully", book });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating book", error: error.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ message: "Books retrieved successfully", books });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving books", error: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book retrieved successfully", book });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving book", error: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { author, genre, price, inStock } = req.body;

    if (!author && !genre && !price && !inStock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    author ? (book.author = author.replace(/\s+/g, " ")) : book;
    genre ? (book.genre = genre.replace(/\s+/g, " ")) : book;
    price ? (book.price = price) : book;
    inStock ? (book.inStock = inStock) : book;

    await book.save();

    res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating book", error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.deleteOne();

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting book", error: error.message });
  }
};

// Helper function to format book response with consistent field order
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

export { createBook, getAllBooks, getBookById, updateBook, deleteBook };
