import express from 'express';
import { createBook, getAllBooks, getBookById, updateBook, deleteBook } from '../controllers/bookController.js';
import authMiddleware from '../middleware/Auth.middleware.js';

const bookRouter = express.Router();

bookRouter.get('/', getAllBooks);
bookRouter.get('/:id', getBookById);
bookRouter.post('/', authMiddleware, createBook);
bookRouter.put('/:id', authMiddleware, updateBook);
bookRouter.delete('/:id', authMiddleware, deleteBook);    

export default bookRouter;