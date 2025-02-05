const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  service: { type: String, required: true },
  pickupDate: { type: Date, required: true },
  status: { type: String, enum: ["pending", "in progress", "completed"], default: "pending" },
  instructions: { type: String },
});

module.exports = mongoose.model("Order", orderSchema);
