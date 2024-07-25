require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose");
const multer = require("multer")
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const PORT = 5000
const app = express()


cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,

})

//Connect to mongodb
mongoose
    .connect("mongodb://localhost:27017/image-upload")
    .then(() => console.log("DB connected"))
    .catch((e) => console.log(e));
//image schema
const imageSchema = new mongoose.Schema({
    url: String,
    public_id: String,
})
//Model
const Image = mongoose.model("Image", imageSchema);

//Configure milter storage cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "images-folder",
        format: async (req, file) => "png",
        public_id: (req, file) => file.fieldname + "_" + Date.now(),
        transformation: [
            {
                width: 800,
                height: 600,
                crop: "fill",
            },
        ],
    },
});

//Configure Multer
const upload = multer({
    storage,
    limits: 1024 * 1020 * 5, //5MB limit
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Not an image! Please upload an image", false));
        }
    },
});
//upload route

app.post('/upload', upload.single("file"), async (req, res) => {
    console.log(req.file);
    const uploaded = await Image.create({
        url: req.file.path,
        public_id: req.file.filename,
    })
    res.json({ message: "File uploaded", uploaded })
})

app.get('/images', async (req, res) => {
    try {
        const images = await Image.find();
        res.json({ images })
    } catch (error) {
        res.json(error)
    }
})
//!start the server
app.listen(PORT, console.log(`Server is up and running..`));