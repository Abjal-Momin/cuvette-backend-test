# Bookstore API

A robust RESTful API for managing a bookstore, featuring user authentication and complete CRUD (Create, Read, Update, Delete) functionality for books. This backend service is built with Node.js, Express, and MongoDB.

**Live Link:** [Your Deployed API Link Here](https://example.com)

---

## ✨ Features

- **User Authentication**:
  - Secure user registration and login.
  - JWT (JSON Web Token) based authentication to protect routes.
  - Password hashing using `bcrypt` for security.
- **Book Management (CRUD)**:
  - **Create**: Add new books to the collection.
  - **Read**: Get a list of all books or retrieve a single book by its ID.
  - **Update**: Modify details of an existing book.
  - **Delete**: Remove a book from the collection.
- **Authorization**:
  - Only the user who created a book can update or delete it.
- **Input Validation**:
  - Ensures data integrity with server-side validation for required fields and data types.
- **Error Handling**:
  - Clear and consistent error messages with appropriate HTTP status codes.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **Language**: JavaScript (ESM)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1.  Clone the repository:

    ```sh
    git clone https://github.com/Abjal-Momin/cuvette-backend-test.git
    cd backend-test
    ```

2.  Install the dependencies:

    ```sh
    npm install
    ```

3.  Create a `.env` file in the root directory and add the following environment variables:

    ```env
    MONGODB_URL=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    PORT=5000
    ```

4.  Start the server:
    ```sh
    npm start
    ```

The API will be running at `http://localhost:5000`.

---

## 📝 API Endpoints

A full list of available endpoints and how to use them can be found in the API Documentation. 
***
🧪 Postman Test Scenarios
Step Endpoint Method Auth Required Purpose
1 /api/users/register POST ❌ No Register a new user
2 /api/users/login POST ❌ No Get JWT token
3 /api/books GET ❌ No Publicly list all books
4 /api/books/:id GET ❌ No Get a book by ID
5 /api/books POST ✅ Yes Create a new book
6 /api/books/:id PUT ✅ Yes Update a book
7 /api/books/:id DELETE ✅ Yes Delete a book

- ***

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
