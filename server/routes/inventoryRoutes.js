const express = require("express");
const Inventory = require("../models/Inventory");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const items = await Inventory.find().sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, quantity, price, available } = req.body;
    const item = new Inventory({
      name,
      quantity,
      price,
    });

    const savedItem = await item.save();

    res.status(201).json({
      message: "Inventory item added",
      item: savedItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const item = await Inventory.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Inventory item not found",
      });
    }

    res.json({
      message: "Inventory item deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, quantity, price, available } = req.body;

    const item = await Inventory.findByIdAndUpdate(
      req.params.id,
      {
        name,
        quantity,
        price,
        available,
      },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({
        message: "Inventory item not found",
      });
    }

    res.json({
      message: "Inventory updated",
      item,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;