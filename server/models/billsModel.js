const mongoose = require("mongoose");

const billsSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    subTotal: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    paymentMode: {
      type: String,
      required: true,
      enum: ["cash", "online", "card"],
    },
    tax: { type: Number, required: true },
    grandTotal: {
      type: Number,
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // This should match your user model name
      required: true,
    },
    status: {
      type: String,
      default: "active",
      required: true,
      enum: ["active", "inactive", "archived", "draft"],
    },
    archivedAt: { type: Date, required: false },
    cartItems: {type: Array, required: true}
  },
  { timestamps: true }
);

const billsModel = mongoose.model("bills", billsSchema);

module.exports = billsModel;
