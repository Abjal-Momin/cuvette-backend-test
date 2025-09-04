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
      maxlength: [50, "Genre cannot exceed 50 characters"],
      // enum: {
      //   values: [
      //     "Fiction",
      //     "Non-Fiction",
      //     "Mystery",
      //     "Thriller",
      //     "Romance",
      //     "Science Fiction",
      //     "Fantasy",
      //     "Biography",
      //     "History",
      //     "Self-Help",
      //     "Business",
      //     "Technology",
      //     "Health",
      //     "Travel",
      //     "Children",
      //     "Other",
      //   ],
      //   message: "Please select a valid genre",
      // },
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

// Indexes for better query performance
// bookSchema.index({ title: 'text', author: 'text' });
// bookSchema.index({ genre: 1 });
// bookSchema.index({ inStock: 1 });
// bookSchema.index({ createdBy: 1 });
// bookSchema.index({ createdAt: -1 });

// Virtual for book URL (if needed)
// bookSchema.virtual('url').get(function() {
//   return `/api/books/${this._id}`;
// });

export default mongoose.model("Book", bookSchema);
