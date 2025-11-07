const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ AUTH FIRST
app.use("/auth", authRoutes);

// ✅ USERS ROUTE
app.use("/users", userRoutes);

// ✅ POSTS ROUTE
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("✅ RBAC API Running");
});

module.exports = app;
