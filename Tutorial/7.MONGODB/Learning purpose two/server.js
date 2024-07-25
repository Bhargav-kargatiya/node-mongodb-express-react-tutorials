const express = require("express");
const ejsLayout = require("express-ejs-layouts");
const path = require("path");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const PORT = 5000;
//Serve the static files/folder
app.use(express.static(path.join(__dirname, "public")));
//Set the view engine as  ejs
app.set("view engine", "ejs");
//Plugin the ejs layout as a middleware
app.use(ejsLayout);
app.set("layout", "layout/main-layout");


//username: bhargavkargatiya2003
//password: 0ayBVbmC0GieWBtn
const mongodbURL = "mongodb+srv://bhargavkargatiya2003:0ayBVbmC0GieWBtn@cluster0.crkbeee.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(mongodbURL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

const connectDB = async () => {
    try {
        await client.connect();
        console.log("MongoDB Connected successfully");
        //1.Create your db (school)
        const database = client.db("masynctech");
        //2.Collections
        const students = database.collection("students");
        const employees = database.collection("employees");
        const books = database.collection("books");
        // const employeesDocs = [
        //     { name: "Alice", age: 25, department: "HR" },
        //     { name: "Bob", age: 30, department: "Finance" },
        //     { name: "Charlie", age: 35, department: "IT" },
        //     { name: "David", age: 40, department: "Operations" },
        //     { name: "Eva", age: 45, department: "IT" },
        // ];
        // const result = await employees.insertMany(employeesDocs);
        const employeesCursor = employees.find({ age: { $gt: 30 } });
        const result = await employeesCursor.toArray();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};
//Run the function
connectDB();

//!Start the server
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
