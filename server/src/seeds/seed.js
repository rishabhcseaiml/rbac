require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
console.log("Loaded MONGO_URI =", process.env.MONGO_URI);

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    await User.deleteMany({});

    const users = [
      { name: "Admin User", email: "admin@example.com", password: "admin123", role: "Admin" },
      { name: "Editor User", email: "editor@example.com", password: "editor123", role: "Editor" },
      { name: "Viewer User", email: "viewer@example.com", password: "viewer123", role: "Viewer" }
    ];

    for (let u of users) {
      const hash = await User.hashPassword(u.password);

      await new User({
        name: u.name,
        email: u.email,
        passwordHash: hash,   // ✅ Correct field
        role: u.role
      }).save();
    }

    console.log("\n🌱 Seed complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
})();
