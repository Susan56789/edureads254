const express = require('express');
const asyncHandler = require('express-async-handler');
const Book = require('../models/Book');
const { protect } = require('../middlewares/auth');
const router = express.Router();

// Get all books
router.get(
    '/',
    asyncHandler(async (req, res) => {
        const books = await Book.find({});
        res.json(books);
    })
);

// Get a single book by ID
router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404);
            throw new Error('Book not found');
        }
    })
);

// Add a new book (protected route)
router.post(
    '/',
    protect,
    asyncHandler(async (req, res) => {
        const { title, author, description, pdfUrl, audioUrl } = req.body;
        const book = new Book({
            title,
            author,
            description,
            pdfUrl,
            audioUrl,
        });

        const createdBook = await book.save();
        res.status(201).json(createdBook);
    })
);

// Update a book (protected route)
router.put(
    '/:id',
    protect,
    asyncHandler(async (req, res) => {
        const { title, author, description, pdfUrl, audioUrl } = req.body;
        const book = await Book.findById(req.params.id);

        if (book) {
            book.title = title || book.title;
            book.author = author || book.author;
            book.description = description || book.description;
            book.pdfUrl = pdfUrl || book.pdfUrl;
            book.audioUrl = audioUrl || book.audioUrl;

            const updatedBook = await book.save();
            res.json(updatedBook);
        } else {
            res.status(404);
            throw new Error('Book not found');
        }
    })
);

// Delete a book (protected route)
router.delete(
    '/:id',
    protect,
    asyncHandler(async (req, res) => {
        const book = await Book.findById(req.params.id);

        if (book) {
            await book.remove();
            res.json({ message: 'Book removed' });
        } else {
            res.status(404);
            throw new Error('Book not found');
        }
    })
);

module.exports = router;