const express = require("express");
const axios = require("axios")
const app = express();
const PORT = 3001

//!Simulate an error (middleware error handling)
// app.use((req, res, next) => {
//     const iserror = true;
//     if (iserror) {
//         //Create an error object 
//         const err = new Error("User not found")
//         next(err)
//     } else {
//         next()
//     }
// })
//!Synchronous error handling
// app.use((req, res, next) => {
//     const iserror = false;
//     try {
//         if (iserror) {
//             throw new Error("Synchronous error occured")
//         }
//         next()
//     } catch (err) {
//         next(err)
//     }
// })

//!Handling Asynchronous Errors
//route to fetch post
app.get('/posts', async (req, res, next) => {
    try {
        const respose = await axios.get("https://jsonplaceholder.typicode.com/posts");
        res.json(respose.data);
    } catch (error) {
        next(error)
    }
})

//Regular route
app.get("/", (req, res) => {
    res.json({
        message: "welcome to error handler"
    })
})


//!Custom Error handling middleware
// app.use((err, req, res, next) => {
//     //Setting HTTP status code
//     res.status(err.status || 500)
//     res.json({
//         message: err.message,
//         stack: err.stack
//     })
// })
// !Custom Error handling middleware (for Synchronous error)
app.use((err, req, res, next) => {
    //check if it's an axios error
    if (err.respose) {
        res.status(err.respose.status).json(err.respose.data);
    } else if (err.request) {
        res.status(503).json({
            message: "Service Unavailable"
        });
    } else {
        res.status(500).json({
            message: "Something broken"
        });
    }

})


//start the server
app.listen(PORT, console.log("The server is running"));