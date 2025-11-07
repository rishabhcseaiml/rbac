const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const requireRole = require("../middleware/rbac");
const Post = require("../models/Post");
const User = require("../models/User");

// ✅ CREATE POST (Admin + Editor)
router.post("/", auth, requireRole(["Admin", "Editor"]), async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id
    });

    // ✅ Log activity inside user account
    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        activity: {
          action: "CREATE_POST",
          details: `Created post: ${post.title}`
        }
      }
    });

    res.json(post);
  } catch (err) {
    console.log("Create post error:", err);
    res.status(500).json({ message: "Server error creating post" });
  }
});

// ✅ VIEW POSTS (All roles)
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.log("Post fetch error:", err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});

// ✅ DELETE POST (Admin + Editor)
router.delete("/:id", auth, requireRole(["Admin", "Editor"]), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    await Post.findByIdAndDelete(req.params.id);

    // ✅ Log delete activity
    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        activity: {
          action: "DELETE_POST",
          details: `Deleted post: ${post.title}`
        }
      }
    });

    res.json({ message: "Post deleted" });

  } catch (err) {
    console.log("Delete post error:", err);
    res.status(500).json({ message: "Server error deleting post" });
  }
});

module.exports = router;
