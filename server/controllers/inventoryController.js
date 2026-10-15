const Inventory = require("../models/Inventory");

// GET ALL INVENTORY ITEMS
const getInventory = async (req, res) => {
  try {
    const items = await Inventory.find().sort({
      createdAt: -1,
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ADD INVENTORY ITEM
const addInventory = async (req, res) => {
  try {
    const { name, quantity, price, available } = req.body;

    if (!name || quantity === undefined || price === undefined) {
      return res.status(400).json({
        message: "Name, quantity and price are required",
      });
    }

    const item = new Inventory({
      name,
      quantity,
      price,
      available:
        available !== undefined
          ? available
          : Number(quantity) > 0,
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
};

// UPDATE INVENTORY ITEM
const updateInventory = async (req, res) => {
  try {
    const { name, quantity, price, available } = req.body;
    const updates = {};

    if (name !== undefined) updates.name = name;
    if (quantity !== undefined) updates.quantity = quantity;
    if (price !== undefined) updates.price = price;

    if (available !== undefined) {
      updates.available = available;
    } else if (quantity !== undefined) {
      updates.available = Number(quantity) > 0;
    }

    const item = await Inventory.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
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
};

// DELETE INVENTORY ITEM
const deleteInventory = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndDelete(
      req.params.id
    );

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
};

module.exports = {
  getInventory,
  addInventory,
  updateInventory,
  deleteInventory,
};