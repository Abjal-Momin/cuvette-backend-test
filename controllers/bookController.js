import Book from "../models/Book.js";
import { formatBookResponse } from "../utils/helper.js";
import mongoose from "mongoose";

const createBook = async (req, res) => {
  try {
    const { title, author, genre, price, inStock } = req.body;

    if (!title || !author || !genre || !price || !inStock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if price and inStock are numbers
    if (typeof price !== "number" || typeof inStock !== "boolean") {
      return res
        .status(400)
        .json({ message: "Price & inStock must be a number" });
    }

    // Check if a book with the same title already exists
    const existingBookwithTitle = await Book.findOne({
      title: title.replace(/\s+/g, " "),
    });

    if (existingBookwithTitle) {
      return res
        .status(409)
        .json({ message: "Book with this title already exists" });
    }

    // Comes From Middleware
    const user = req.user;

    // Create a new book with the user's name and email
    const book = new Book({
      title: title.replace(/\s+/g, " "), // replace spaces with a single space
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

    res.status(201).json({
      message: "Book created successfully",
      book: formatBookResponse(book),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating book", error: error.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();

    // check if no books are found
    if (!books.length) {
      return res.status(200).json({ message: "No books found" });
    }

    // format books to get the correct fields
    const formattedBooks = books.map((book) => formatBookResponse(book));

    return res.status(200).json({
      message: "Books retrieved successfully",
      books: formattedBooks,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving books", error: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    // check if id is a valid ObjectId
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      return res.status(400).json({ message: "Invalid id" });
    }

    // find book by id
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book retrieved successfully",
      book: formatBookResponse(book),
    });
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

    // check if price and inStock are numbers
    if (typeof price !== "number" || typeof inStock !== "boolean") {
      return res
        .status(400)
        .json({ message: "Price & inStock must be a number" });
    }

    const book = await Book.findById(id);

    // Update the book if the fields are provided
    author ? (book.author = author.replace(/\s+/g, " ")) : book;
    genre ? (book.genre = genre.replace(/\s+/g, " ")) : book;
    price ? (book.price = price) : book;
    inStock ? (book.inStock = inStock) : book;

    // Save the updated book
    await book.save();

    res.status(200).json({
      message: "Book updated successfully",
      book: formatBookResponse(book),
    });
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

    // Delete the book
    await book.deleteOne();

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting book", error: error.message });
  }
};

export { createBook, getAllBooks, getBookById, updateBook, deleteBook };
