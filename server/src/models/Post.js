const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },

    // ✅ Author reference (User ID)
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

// ✅ Fix overwrite error (important)
module.exports = mongoose.models.Post || mongoose.model("Post", postSchema);
