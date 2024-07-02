const express = require('express');
const asyncHandler = require('express-async-handler');
const { ObjectId } = require('mongodb');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Get all books, search for books, or filter by genre
router.get(
    '/',
    asyncHandler(async (req, res) => {
        const { search, genre } = req.query;
        const booksCollection = req.app.locals.books;

        let books;
        if (search) {
            const searchRegex = new RegExp(search, 'i'); // Case-insensitive search
            books = await booksCollection.find({
                $or: [
                    { title: { $regex: searchRegex } },
                    { author: { $regex: searchRegex } }
                ]
            }).toArray();
        } else if (genre) {
            books = await booksCollection.find({ genre: genre }).toArray();
        } else {
            books = await booksCollection.find({}).toArray();
        }

        res.json(books);
    })
);

// Get a single book by ID
router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid book ID format' });
        }

        try {
            const book = await req.app.locals.books.findOne({ _id: new ObjectId(id) });
            if (book) {
                res.json(book);
            } else {
                res.status(404).json({ message: 'Book not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    })
);

// Get four related books by genre
router.get(
    '/related/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid book ID format' });
        }

        try {
            const book = await req.app.locals.books.findOne({ _id: new ObjectId(id) });

            if (book) {
                const relatedBooks = await req.app.locals.books
                    .find({ genre: book.genre, _id: { $ne: new ObjectId(id) } })
                    .limit(4)
                    .toArray();

                res.json(relatedBooks);
            } else {
                res.status(404).json({ message: 'Book not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    })
);

// Add a new book (protected route)
router.post(
    '/',
    protect,
    asyncHandler(async (req, res) => {
        const { title, author, description, pdfUrl, audioUrl, imageUrl, genre } = req.body;
        const newBook = {
            title,
            author,
            description,
            pdfUrl,
            audioUrl,
            imageurl,
            genre
        };

        const result = await req.app.locals.books.insertOne(newBook);
        res.status(201).json(result.ops[0]);
    })
);

// Update a book (protected route)
router.put(
    '/:id',
    protect,
    asyncHandler(async (req, res) => {
        const { title, author, description, pdfUrl, audioUrl, imageUrl, genre } = req.body;
        const book = await req.app.locals.books.findOne({ _id: new ObjectId(req.params.id) });

        if (book) {
            const updatedBook = {
                ...book,
                title: title || book.title,
                author: author || book.author,
                description: description || book.description,
                pdfUrl: pdfUrl || book.pdfUrl,
                audioUrl: audioUrl || book.audioUrl,
                imageUrl: imageUrl || book.imageUrl,
                genre: genre || book.genre
            };

            await req.app.locals.books.updateOne({ _id: new ObjectId(req.params.id) }, { $set: updatedBook });
            res.json(updatedBook);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    })
);

// Delete a book (protected route)
router.delete(
    '/:id',
    protect,
    asyncHandler(async (req, res) => {
        const result = await req.app.locals.books.deleteOne({ _id: new ObjectId(req.params.id) });

        if (result.deletedCount === 1) {
            res.json({ message: 'Book removed' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    })
);

module.exports = router;
