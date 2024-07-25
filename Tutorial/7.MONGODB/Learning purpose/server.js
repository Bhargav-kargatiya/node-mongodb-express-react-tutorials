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
        // const results = await students.insertOne({
        //     name: "bhargav",
        //     age: 21,
        //     grade: "A",
        //     pass: false,
        //     subjects: ["Maths12", "Physics", "Macro"],
        // })
        // const results = await students.insertMany([
        //     {
        //         name: "John",
        //         age: 26,
        //         grade: "B",
        //         pass: false,
        //         subjects: ["Chemistry", "Biology"],
        //     },
        //     {
        //         name: "Joseph",
        //         grade: "B",
        //         pass: false,
        //         age: 30,
        //         subjects: ["Chemistry1", "Biology1"],
        //     },
        //     {
        //         name: "Prince",
        //         grade: "C",
        //         pass: true,
        //         age: 30,
        //         subjects: ["Chemistry1", "Biology1"],
        //     },
        // ]);

        // const resultsCursor = students.find();
        // const results = await resultsCursor.toArray();
        // const results = await students.findOne({
        //     age: 30,
        // });
        // const results = await students.updateOne(
        //     { name: "John" },
        //     { $set: { name: "Alice", age: 99 } }
        // );
        const results = await students.findOneAndUpdate({
            name: "bhargav"
        }, {
            $set: { name: "kargatiya", age: 23, grade: 'B' }
        })
        console.log(results);

    } catch (error) {
        console.log(error);
    }
};
//Run the function
connectDB();

//!Start the server
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
