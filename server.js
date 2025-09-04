import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import bookRouter from "./routes/bookRoutes.js";
connectDB();

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);

app.use("/api/books/", bookRouter);


// app.use("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route  not found`,
//   });
//   console.log("Route not found");
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server is running on", PORT);
  console.log("localhost:3000/api/users/register");
});
