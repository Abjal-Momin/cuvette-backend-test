import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
      unique: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
      minlength: [2, "Title must be at least 2 character"],
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
      maxlength: [100, "Author name cannot exceed 100 characters"],
      minlength: [2, "Author name must be at least 2 character"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true,
      maxlength: [50, "Genre cannot exceed 50 characters"]
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
      max: [9999, "Price cannot exceed 99999"],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", bookSchema);
