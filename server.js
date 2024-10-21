const express = require("express");
const app = express();
require("dotenv").config(); // Add parentheses here
const jwt = require("jsonwebtoken");
const posts = [
  {
    username: "Abhinab",
    title: "post 1",
  },
  {
    username: "Singh",
    title: "post 1",
  },
];

app.use(express.json());

app.get("/post", authenticateToken, (req, res) => {
  console.log("User in request:", req.user);
  const userPosts = posts.filter((post) => post.username === req.user.name);
  console.log("Filtered posts:", userPosts);
  res.json(userPosts);
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    console.log("No token provided");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

app.listen(3000);
