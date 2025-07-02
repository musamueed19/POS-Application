const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitWeight: { type: String, required: true, enum: ["kg", "litre", "dozen", "gram", "pound", "ounce"] },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users', // This should match your user model name
      required: true
    },
    status: {
      type: String,
      default: "active",
      required: true,
      enum: ["active", "inactive", "archived", "draft"],
    },
    archivedAt: { type: Date, required: false },
  },
  { timestamps: true }
);

const itemsModel = mongoose.model("items", itemsSchema);

module.exports = itemsModel;
