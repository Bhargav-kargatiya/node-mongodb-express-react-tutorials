const Post = require("../model/post");


const showCreatefrom = (req, res) => {
    res.render("createPost");
};
const showPost = async (req, res) => {
    const posts = await Post.find();
    res.render("list", { posts });
}
const createPost = async (req, res) => {
    const { title, content, author } = req.body;
    await Post.create({
        title,
        content,
        author,
    });
    //redirect to the post list
    res.redirect("/list");
}
module.exports = {
    showCreatefrom, showPost, createPost
}
