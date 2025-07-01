const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true, // This ensures email uniqueness
    },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      default: "salesperson",
      enum: ["salesperson", "admin", "owner", "user", "customer"],
    },

    archivedAt: { type: Date, required: false },
    verified: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const usersModel = mongoose.model("users", usersSchema);

module.exports = usersModel;
