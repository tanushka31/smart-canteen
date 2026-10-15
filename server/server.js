require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const orderRoutes = require("./routes/orderRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/inventory", inventoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "SmartCanteen API is running!",
  });
});

// Test route
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Frontend and backend are connected!",
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`SmartCanteen server running on port ${PORT}`);
});