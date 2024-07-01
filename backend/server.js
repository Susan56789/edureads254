const express = require('express');
const { MongoClient, GridFSBucket, ObjectId } = require("mongodb");
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users.js');
const bookRoutes = require('./routes/books.js');
const { errorHandler } = require('./middlewares/errorHandler');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// MongoDB URI
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Middleware setup
app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Default landing page
app.get("/", (req, res) => {
    res.send("Welcome to EduReads254 Backend!");
});

// Authentication Middleware
const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token provided' });

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(400).json({ message: 'Invalid token' });
            req.user = decoded;
            next();
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Connect to the database and initialize collections
const run = async () => {
    try {
        await client.connect();
        console.log("Connected to the database");

        const database = client.db("edureads254");
        const books = database.collection("books");
        const users = database.collection("users");
        const bucket = new GridFSBucket(database, {
            bucketName: 'images'
        });
        console.log("Collections initialized");

        // Set locals for collections
        app.locals.books = books;
        app.locals.users = users;

        // Route usage
        app.use('/api/users', userRoutes);
        app.use('/api/books', bookRoutes);

        // Error handling middleware
        app.use(errorHandler);

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (err) {
        console.error("Error connecting to the database:", err);
    }
};

run().catch(console.dir);

// Close MongoDB connection on server shutdown
process.on('SIGINT', async () => {
    await client.close();
    console.log('MongoDB connection closed');
    process.exit(0);
});
