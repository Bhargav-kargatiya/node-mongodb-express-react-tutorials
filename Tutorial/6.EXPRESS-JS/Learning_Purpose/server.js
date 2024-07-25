const PORT = 8082;
const express = require("express");
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const app = express();
const cookieParser = require("cookie-parser");
//!Middlewares
app.use(express.urlencoded({ extended: true }));
//!Set the view engine
app.set("view engine", "ejs");
app.use(cookieParser());

mongoose.connect("mongodb://localhost:27017/userAuthDB")
    .then(() => {
        console.log("DB has been connected");
    })
    .catch((e) => {
        console.log(e);
    });
//?Create user Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: {
        type: String,
        default: "user",
    },
});
//Compile the schema to form model
const User = mongoose.model("User", userSchema);


//-----CUSTOM MIDDLEWARES-----
//!--isAuthenticated (Authentication)
const isAuthenticated = (req, res, next) => {
    //Check the user in the cookies
    const userDataCookie = req.cookies.userData;
    try {
        const userData = userDataCookie && JSON.parse(userDataCookie);
        if (userData && userData.username) {
            //!Add the login user into the req object
            req.userData = userData;
            return next();
        } else {
            res.send("You are not login");
        }
    } catch (error) {
        console.log(error);
    }
};
//!-isAdmin (Authorization)
const isAdmin = (req, res, next) => {
    if (req.userData && req.userData.role === "admin") {
        return next();
    } else {
        res.send("Fobidden: You do not have access, admin only");
    }
};

//Home Route
app.get("/", (req, res) => {
    res.render("home");
});
//Login Route (login form)
app.get("/login", (req, res) => {
    res.render("login");
});
//admin Route 
app.get("/admin-only", isAuthenticated, isAdmin, (req, res) => {
    res.render("admin");
});

//Register Route (Register form)
app.get("/register", (req, res) => {
    res.render("register");
});
//Register logic (Register form)
app.post("/register", async (req, res) => {
    const { username, password } = req.body
    const hashPassword = await bcrypt.hash(password, 10)
    await User.create({
        username,
        password: hashPassword
    });
    //Redirect to login
    res.redirect("/login");

});

//Login Route logic
app.post("/login", async (req, res) => {
    const { username, password } = req.body
    //!. Find the user in the DB
    const userFound = await User.findOne({ username: username })
    if (userFound && (await bcrypt.compare(password, userFound.password))) {
        //! Create some cookies (cookie);
        //* Prepare the login user data
        //? Setting the cookie with the userdata
        res.cookie("userData", JSON.stringify({
            username: userFound.username,
            role: userFound.role,
        }), {
            maxAge: 3 * 24 * 60 * 1000, //3days expiration
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        });

        //!Render the user dashboard
        res.redirect("/dashboard");
    } else {
        res.send("Invalid login credentials");
    }
});

//Dashboard Route
app.get("/dashboard", isAuthenticated, (req, res) => {
    // //! Grab the user from the cookie
    // const userData = req.cookies.userData ? JSON.parse(req.cookies.userData) : null;
    // const username = userData ? userData.username : null;
    // //! Render the template
    // if (username) {
    const username = req.userData.username;
    res.render("dashboard", { username });
    // } else {
    //     //!Redirect to login
    //     res.redirect("/login");
    // }
});

//Logout Route
app.get("/logout", (req, res) => {
    //!Logout
    res.clearCookie("userData");
    //redirect
    res.redirect("/login");
});


//start the server
app.listen(PORT, console.log(`The server is running on PORT ${PORT}`));
