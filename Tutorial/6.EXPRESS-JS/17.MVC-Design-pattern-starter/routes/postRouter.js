const express = require("express")

const { showCreatefrom, showPost, createPost } = require("../controller/postControler");
const postRouter = express.Router();

postRouter.get("/", (req, res) => {
    res.render("index");
});
//! Show the create form
postRouter.get("/create", showCreatefrom);
//! To get all posts
postRouter.get("/list", showPost);
//! Create the post (The main logic)
postRouter.post("/create", createPost);
module.exports = postRouter;