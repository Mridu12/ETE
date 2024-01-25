const Recommend = require("../models/Recommend");
const multer = require("multer");

const fs = require("fs");
const cookie = require('cookie');
const jwt = require("jsonwebtoken");
const secret = "Secret123"; 

const cookieParser = require("cookie-parser");



const movie = async (req, res) => {
  if (req.file && req.file.originalname) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const { movieTitle, summary, imdb } = req.body;
      const recommendation = await Recommend.create({
        movieTitle,
        summary,
        imdb,
        coverPhoto: newPath,
        author: info.id,
      });
      res.json({ recommendation });
    });
  } else {
    res.status(400).json({ error: "No file uploaded" });
  }
};

const moviePreview = 
    async (req, res) => {
        res.json(
          await Recommend.find()
            .populate("author", ["username"])
            .sort({ createdAt: -1 })
            .limit(20)
        );
      }

const moviePreviewById =  async (req, res) => {
    const { id } = req.params;
    const movie = await Recommend.findById(id).populate("author", ["username"]);
    res.json(movie);
  };
module.exports = { movie,moviePreview,moviePreviewById };
