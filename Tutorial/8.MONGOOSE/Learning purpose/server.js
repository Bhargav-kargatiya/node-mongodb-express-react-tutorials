const express = require("express")
const PORT = 5000 || process.env.PORT
const app = express();
const mongoose = require("mongoose")
const URL = "mongodb://localhost:27017/Userdb";

const connectToDB = async () => {
    try {
        await mongoose.connect(URL)
        console.log("Mongodb Connected Successfully");
    } catch (error) {
        console.log(`Error connecting to mongodb ${error}`);
    }
}
connectToDB();

// const userProfileSchema = new mongoose.Schema({
//     username: String,
//     age: Number,
//     birthdat: Date,
//     isActive: Boolean,
//     hobbies: [String],
//     objectId: mongoose.Schema.Types.ObjectId,
//     address: {
//         street: String,
//         city: String,
//         postCode: Number
//     },
//     customeData: mongoose.Schema.Types.Mixed
// });
// const User = mongoose.model("User", userProfileSchema); //users

// const newUser = new User({
//     username: "masynctech",
//     age: 26,
//     birthday: new Date("2001-04-15"),
//     isActive: true,
//     hobbies: ["Soccer", "Reading", "Coding"],
//     address: {
//         street: "789 0ak St",
//         city: "Kumasi",
//         postaclCode: 5551,
//     },
//     customdata: {
//         country: "Ghana",
//     },
// });
// newUser.save().then((data) => { console.log(data); }).catch((err) => { console.log(err); })

// User.create({
//     username: "emmanuel",
//     age: 26,
//     birthday: new Date("2001-04-15"),
//     isActive: true,
//     hobbies: ["Soccer", "Reading", "Coding"],
//     address: {
//         street: "789 0ak St",
//         city: "Kumasi",
//         postaclCode: 5551,
//     },
//     customdata: {
//         country: "Ghana",
//     },
// }).then((data) => console.log(data))
//     .catch((err) => console.log(err));

//! ----.insertMany()--------
// User.insertMany([
//     {
//         username: "emmanuel",
//         age: 26,
//         birthday: new Date("2001-04-15"),
//         isActive: true,
//         hobbies: ["Soccer", "Reading", "Coding"],
//         address: {
//             street: "789 0ak St",
//             city: "Kumasi",
//             postaclCode: 5551,
//         },
//         customdata: {
//             country: "Ghana",
//         },
//     },
//     {
//         username: "Prince",
//         age: 28,
//         birthday: new Date("2001-08-15"),
//         isActive: true,
//         hobbies: ["Basketball", "Jogging", "Coding"],
//         address: {
//             street: "789 0ak St",
//             city: "Camp",
//             postaclCode: 5551,
//         },
//         customdata: {
//             country: "Ghana",
//         },
//     },
// ])
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));

// User.find()
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
//! ----.where()--------
// const findUsers = async () => {
//     try {
//         const users = await User.find().where("age").gte(27).lt(30)
//         console.log(users);
//     } catch (error) {
//         console.log(error);
//     }
// };
// findUsers();

// ! ----.sort()--------
// const findUsers = async () => {
//     try {
//         const users = await User.find().sort({ age: -1 });
//         console.log(users);
//     } catch (error) {
//         console.log(error);
//     }
// };
//findUsers();
// !======UPDATING DOCUMENTS -----
//!-----updateOne()--------
// const updateOneFn = async () => {
//     try {
//         const updateDoc = await User.findOneAndUpdate(
//             { username: "kargatiya" },
//             {
//                 // $set: { username: "kargatiya" },
//                 $unset: { age: -1 },
//             },
//             { new: true }
//         );
//         console.log(updateDoc);
//     } catch (error) {
//         console.log(error);
//     }
// };
// updateOneFn();

// const userSchema = new mongoose.Schema(
//     {
//         username: {
//             type: String,
//             required: [true, "Please username is required"],
//             unique: true,
//             minLength: 3,
//             maxLength: 10,
//         },
//         email: {
//             type: String,
//             required: [true, "Please email is required"],
//             match: /@/,
//         },
//         age: {
//             type: Number,
//             min: 18,
//             max: 65,
//         },
//         gender: {
//             type: String,
//             enum: ["Male", "Female", "Other"],
//         },
//     },
//     {
//         timestamps: true,
//     }
// );
// const Phoneuser = mongoose.model("Phoneuser", userSchema); //users
// //!Create user
// const createUser = async () => {
//     try {
//         const newUser = await Phoneuser.create({
//             username: "masynctech",
//             age: 40,
//             email: "masynctech@gmail.com",
//             gender: "Female"

//         });
//         console.log(newUser);
//     } catch (error) {
//         console.log(error);
//     }
// };
// createUser();

//!9.Data-Modelling-by-reference
//authorSchema
// const authorSchema = new mongoose.Schema(
//     {
//         name: String,
//     },
//     {
//         timestamps: true,
//     }
// );
// const Author = mongoose.model("Author", authorSchema);
// //bookschema
// const bookSchema = new mongoose.Schema(
//     {
//         title: String,
//         author: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Author", //Referencing
//             required: true,
//         },
//     },
//     {
//         timestamps: true,
//     }
// );

// //!Models
// const Book = mongoose.model("Boook", bookSchema);

// //!-----Create Author---
// const createAuthor = async () => {
//     try {
//         await Author.create({ name: "Bhargav" });
//     } catch (error) {
//         console.log(error);
//     }
// };
// // createAuthor();
// //!-----Create book
// const createBook = async () => {
//     try {
//         await Book.create({
//             title: "MERN for everyone",
//             author: "66701fbbb7fab4b97e9f2c7e",
//         });
//     } catch (error) {
//         console.log(error);
//     }
// };
// // createBook();
// //!-----fetch books
// const fetchBooks = async () => {
//     try {
//         const books = await Book.find().populate("author");
//         console.log(books);
//     } catch (error) {
//         console.log(error);
//     }
// };
// fetchBooks();



// *10.Data-Modelling-one to many
// ! ----one-many relationship-----
//commentSchema
// const commentSchema = new mongoose.Schema(
//     {
//         text: String,
//     },
//     {
//         timestamps: true,
//     }
// );
// const Comment = mongoose.model("Comment", commentSchema);
// //blogPostSchema
// const blogPostSchema = new mongoose.Schema(
//     {
//         title: String,
//         comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
//     },
//     {
//         timestamps: true,
//     }
// );

// const Post = mongoose.model("Post", blogPostSchema);

// //!-----Create Post---
// const createPost = async () => {
//     try {
//         const newPost = await Post.create({ title: "Awesome Fullstack course" });
//         console.log(newPost);
//     } catch (error) {
//         console.log(error);
//     }
// };
// // createPost();
// //!-----Create comment---
// const createComment = async () => {
//     try {
//         // ? 1.Find the post
//         const postFound = await Post.findById("667022b7048411ac9c247fb7");
//         //? 2.Create the comment
//         const newComment = await Comment.create({ text: "Awesome post2" });
//         //? 3.Pust the comment into the post
//         postFound.comments.push(newComment._id)
//         //? 4.Resave the post
//         await postFound.save();
//     } catch (error) {
//         console.log(error);
//     }
// };
// // createComment();
// //!-----Create comment---
// const fetchPosts = async () => {
//     try {
//         //  ?Find the post
//         const posts = await Post.find().populate("comments");
//         console.log(posts[0].comments[0].text);
//     } catch (error) {
//         console.log(error);
//     }
// };
// fetchPosts();


// *12.Data-Modelling-Many to many
// ! ----many-many relationship-----
//courseSchema
const courseSchema = new mongoose.Schema(
    {
        name: String,
        enrolledStudents: [
            { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
        ],
    },
    {
        timestamps: true,
    }
);
const Course = mongoose.model("Course", courseSchema);
//studentSchema
const studentSchema = new mongoose.Schema(
    {
        name: String,
        enrolledCourse: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    },
    {
        timestamps: true,
    }
);
const Student = mongoose.model("Student", studentSchema);

//!Create the courses
const createCourses = async () => {
    try {
        //create courses
        const courses = await Course.create([
            { name: "Math 101", },
            { name: "History 101", },
        ]);
        console.log(courses);
    } catch (error) {
        console.log(error);
    }
};
// createCourses();
//!Register Student
const createStudents = async () => {
    try {
        //create students
        const students = await Student.create([
            { name: "Alice", },
            { name: "Emma", },
        ]);
        console.log(students);
    } catch (error) {
        console.log(error);
    }
};
// createStudents();
//!Student Applying to courses
const applyToCourse = async () => {
    try {
        // ?1.Find the student
        const foundStudent = await Student.findById("6670282391869cbc50ba13b0");

        // ?2.Find the course
        const courseFound = await Course.findById("667027f0f9eab99544bfb1b0");

        // ?3.Apply to the course (1.update the student enrolledCourses 2.update the enrolledStudents on course)
        // ?4.a Push the course found into the student's enrolledSCourse field
        foundStudent.enrolledCourse.push(courseFound._id);
        // ?4.b Push the student found into the courses's enrolledStudents field
        courseFound.enrolledStudents.push(foundStudent._id);
        // ?5.Resave the student & course docs
        await foundStudent.save();
        await courseFound.save();
        console.log(foundStudent);
        console.log(courseFound);
    } catch (error) {
        console.log(error);
    }
};
applyToCourse();
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));