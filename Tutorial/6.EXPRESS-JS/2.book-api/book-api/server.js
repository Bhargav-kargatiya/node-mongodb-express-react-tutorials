const express = require("express")
const app = express()
const PORT = 2000

//Receiving incoming from the client configuration

const books = [
    { id: "1", title: "The great Gatsby", author: "F.Scott" },
    { id: "2", title: "The Moby Dic", author: "Herman" },
    { id: "3", title: "The MERN Stack", author: "Masynctech" },
];

//Home Route
app.get("/", (req, res) => {
    res.json({
        status: "success",
        message: "Welcome to my first book api using express",
        data: "Masynctech",
    });
});

// Fetching all books
app.get("/books", (req, res) => {
    res.json({
        status: "success",
        message: "Books fetched successfully",
        data: books,
    });
});

// Fetching book by id
app.get("/books/:id", (req, res) => {
    const id = req.params.id;
    const bookFound = books.find((book) => book.id === id);
    if (!bookFound) {
        return res.json({
            status: "failed",
            message: `Book with id ${id} not found`,
        });
    }
    res.json({
        status: "success",
        message: "Books fetched successfully",
        data: bookFound,
    });
});
app.use(express.json());
// Create a book
app.post("/books", (req, res) => {
    const newPost = req.body;
    books.push(newPost);
    res.json({
        status: "success",
        message: "Books created successfully",
        data: books,
    });
});

// Search for a book (req.query)
app.get("/books/search", (req, res) => {
    console.log(req.query);
    res.json({
        status: "success",
        message: "Book found successfully",
    });
});

//start the server
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
