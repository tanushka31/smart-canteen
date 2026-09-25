const express = require("express");
const Order = require("../models/Order");
const Inventory = require("../models/Inventory");
const User = require("../models/User");

const router = express.Router();

// ===============================
// PLACE ORDER
// ===============================
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      phoneNumber,
      pickupLocation,
      items,
      totalAmount,
    } = req.body;

    // Validate phone number
    if (!/^\d{10}$/.test(phoneNumber)) {
      return res.status(400).json({
        message: "Please enter a valid 10-digit phone number",
      });
    }

    // Validate pickup location
    if (!pickupLocation || !pickupLocation.trim()) {
      return res.status(400).json({
        message: "Please enter your pickup location",
      });
    }

    // Check that order has items
    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // ===============================
    // STEP 1: CHECK STOCK
    // ===============================
    for (const item of items) {
      const requestedQuantity =
        Number(item.quantity) || 1;

      const inventoryItem = await Inventory.findOne({
        name: item.name,
      });

      if (
        !inventoryItem ||
        inventoryItem.quantity < requestedQuantity
      ) {
        return res.status(400).json({
          message: `${item.name} does not have enough stock`,
        });
      }
    }

    // ===============================
    // STEP 2: REDUCE STOCK
    // ===============================
    for (const item of items) {
      const requestedQuantity =
        Number(item.quantity) || 1;

      const inventoryItem = await Inventory.findOne({
        name: item.name,
      });

      inventoryItem.quantity -= requestedQuantity;

      inventoryItem.available =
        inventoryItem.quantity > 0;

      await inventoryItem.save();
    }

    // ===============================
    // STEP 3: CREATE ORDER
    // ===============================
    const order = new Order({
      userId,
      phoneNumber,
      pickupLocation,
      items,
      totalAmount,
    });

    const savedOrder = await order.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Order error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ===============================
// GET ALL ORDERS - ADMIN
// ===============================
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===============================
// UPDATE ORDER STATUS - ADMIN
// ===============================
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===============================
// GET ORDERS FOR ONE USER
// ===============================
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;