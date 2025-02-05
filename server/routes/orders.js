const express = require("express");
const Order = require("../models/orderModel");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// 📌 Create a new order
router.post("/create", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "customer") {
      return res.status(403).json({ message: "Access denied. Only customers can book services." });
    }

    const { vendorId, service, pickupDate, instructions } = req.body;
    const newOrder = new Order({
      customerId: req.user.id,
      vendorId,
      service,
      pickupDate,
      instructions,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Get orders for customer
router.get("/customer-orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.user.id }).populate("vendorId", "name location");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Get orders for vendor
router.get("/vendor-orders", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "vendor") {
      return res.status(403).json({ message: "Access denied. Only vendors can view orders." });
    }
    const orders = await Order.find({ vendorId: req.user.id }).populate("customerId", "name location");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Update order status (Vendor Only)
router.put("/update-status/:orderId", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.orderId);
    
    if (!order || order.vendorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied." });
    }

    order.status = status;
    await order.save();
    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
