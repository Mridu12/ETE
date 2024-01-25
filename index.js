const port = 4000;
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "Secret123";
const User = require("./models/User");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");

//////////////////////////////////////////////////////////
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const Post = require("./models/Post");
app.use("/uploads", express.static(__dirname + "/uploads"));

const salt = bcrypt.genSaltSync(10);
///////////////////////////////////////////////////////

const uploadMiddleware2 = multer({ dest: "uploads2/" });

const {
  movie,
  moviePreview,
  moviePreviewById,
} = require("./controllers/Recommend");
app.use("/uploads2", express.static(__dirname + "/uploads2"));

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb+srv://mridul1:mridul12@cluster0.lz1q6ul.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB!");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc.username);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userDoc = await User.findOne({ username });

    if (!userDoc) {
      // User not found
      return res.status(400).json("Wrong credentials!");
    }

    const passOk = await bcrypt.compare(password, userDoc.password);

    if (passOk) {
      //logged
      jwt.sign(
        { username, email: userDoc.email, id: userDoc._id },
        secret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json({
            id: userDoc._id,
            username,
          });
        }
      );
    } else {
      res.status(400).json("Wrong credentials!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json("Logged out successfully");
});

// NOW WE ARE ON THE CREATE NEW POST API SO THIS WILL GO TO CREATE NEW POST CONTROLLER
app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  if (req.file && req.file.originalname) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const { title, summary, content } = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });
      res.json({ postDoc });
    });
  } else {
    res.status(400).json({ error: "No file uploaded" });
  }
});

app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuth = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuth) {
      return res.status(400).json("you are not author");
    }
    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  });
});

app.get("/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

app.delete("/post/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    await Post.deleteOne({ _id: id });
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the post" });
  }
});

//Our reccommendation hub

app.post("/movie", uploadMiddleware2.single("file"), movie);
app.get("/movie", moviePreview);
app.get("/movie/id", moviePreviewById);

app.listen(port, () => {
  console.log(`Server Started on port number ${port} !!`);
});

//online db server mongodb+srv://deepkaran987:tSK9NXEorLbGLEHy@cluster0.my2opxi.mongodb.net/
