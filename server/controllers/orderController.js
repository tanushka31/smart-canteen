const Order = require("../models/Order");
const Inventory = require("../models/Inventory");

// PLACE A NEW ORDER
const placeOrder = async (req, res) => {
  try {
    const {
      userId,
      phoneNumber,
      pickupLocation,
      items,
      totalAmount,
    } = req.body;

    if (!userId || !phoneNumber || !pickupLocation) {
      return res.status(400).json({
        message: "User ID, phone number and pickup location are required",
      });
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      return res.status(400).json({
        message: "Please enter a valid 10-digit phone number",
      });
    }

    if (!pickupLocation.trim()) {
      return res.status(400).json({
        message: "Please enter your pickup location",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // Validate order items and stock
    for (const item of items) {
      const quantity = Number(item.quantity);

      if (!item.name || !Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          message: "Each item must have a name and valid quantity",
        });
      }

      const inventoryItem = await Inventory.findOne({
        name: item.name,
      });

      if (!inventoryItem || inventoryItem.quantity < quantity) {
        return res.status(400).json({
          message: `${item.name} does not have enough stock`,
        });
      }
    }

    // Reduce inventory
    for (const item of items) {
      const quantity = Number(item.quantity);

      const inventoryItem = await Inventory.findOneAndUpdate(
        {
          name: item.name,
          quantity: { $gte: quantity },
        },
        [
          {
            $set: {
              quantity: { $subtract: ["$quantity", quantity] },
              available: {
                $gt: [{ $subtract: ["$quantity", quantity] }, 0],
              },
            },
          },
        ],
        { new: true }
      );

      if (!inventoryItem) {
        return res.status(400).json({
          message: `${item.name} stock changed. Please try again.`,
        });
      }
    }

    const order = new Order({
      userId,
      phoneNumber,
      pickupLocation: pickupLocation.trim(),
      items: items.map((item) => ({
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity),
      })),
      totalAmount,
    });

    const savedOrder = await order.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL ORDERS
const getAllOrders = async (req, res) => {
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
};

// GET ORDERS FOR ONE USER
const getUserOrders = async (req, res) => {
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
};

// UPDATE ORDER STATUS
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Preparing",
      "Ready",
      "Completed",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
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
};

module.exports = {
  placeOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
};