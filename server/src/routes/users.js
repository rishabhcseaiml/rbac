const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const requireRole = require("../middleware/rbac");
const User = require("../models/User");

// ✅ Get all users
router.get("/", auth, requireRole(["Admin"]), async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// ✅ Create User + Log activity
router.post("/", auth, requireRole(["Admin"]), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const passwordHash = await User.hashPassword(password);

    const newUser = await User.create({
      name,
      email,
      passwordHash,
      role,
      activity: [
        {
          action: "User Created",
          details: `Admin created user "${name}"`
        }
      ]
    });

    res.json({ message: "User created successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update Role
router.patch("/:id/role", auth, requireRole(["Admin"]), async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { role: req.body.role });
  res.json({ message: "Role updated" });
});

// ✅ Delete User
router.delete("/:id", auth, requireRole(["Admin"]), async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

module.exports = router;
