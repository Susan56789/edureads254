# EduReads254

An online library application where users can browse, purchase, and access books in PDF or audio format. Admins can manage the library content through an admin dashboard.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

- User authentication (register, login)
- Browse and search books
- Purchase books in PDF or audio format
- User dashboard to view purchased books
- Admin dashboard to manage books
- Payment processing

## Tech Stack

- **Frontend**: Vue.js, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB

## Installation

### Prerequisites

- Node.js
- MongoDB

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/edureads254.git
   cd online-library/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add your MongoDB URI and JWT secret:

   ```plaintext
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run serve
   ```

## Usage

1. Access the frontend at `http://localhost:8080`.
2. Use the admin dashboard to upload new books and manage content.
3. Users can register, login, browse, purchase, and access books.

## Project Structure

### Backend

- `models/`
  - `User.js`: User schema and model
  - `Book.js`: Book schema and model
  - `Payment.js`: Payment schema and model
- `routes/`
  - `users.js`: User-related routes (register, login, get user)
  - `books.js`: Book-related routes (CRUD operations)
  - `payments.js`: Payment-related routes (process payment, get payment history)
- `controllers/`: Controllers for handling the logic of routes
- `middlewares/`: Middleware for authentication and error handling
- `server.js`: Entry point for the backend server

### Frontend

- `src/`
  - `components/`: Reusable Vue components
  - `views/`: Vue views for different pages (Home, Books, BookDetail, Admin, etc.)
  - `router/`: Vue Router configuration
  - `store/`: Vuex store for state management
  - `App.vue`: Main App component
  - `main.js`: Entry point for the frontend application

## API Endpoints

### User Routes

- **POST** `/api/users/register`: Register a new user
- **POST** `/api/users/login`: Authenticate a user and issue a JWT
- **GET** `/api/users/:id`: Get user details
- **PUT** `/api/users/:id`: Update user details

### Book Routes

- **GET** `/api/books`: Get a list of all books
- **GET** `/api/books/:id`: Get details of a specific book
- **POST** `/api/books`: Upload a new book (admin only)
- **PUT** `/api/books/:id`: Update book details (admin only)
- **DELETE** `/api/books/:id`: Delete a book (admin only)

### Payment Routes

- **POST** `/api/payments`: Process a book payment
- **GET** `/api/payments/:userId`: Get payment history for a user

## License

This project is licensed under the MIT License.
