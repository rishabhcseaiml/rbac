const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    passwordHash: String,
    role: { 
      type: String, 
      enum: ["Admin", "Editor", "Viewer"], 
      default: "Viewer" 
    },

    // ✅ Activity stored inside user doc
    activity: [
      {
        action: String,
        details: String,
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

userSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

// ✅ Prevent "Cannot overwrite model" error
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
