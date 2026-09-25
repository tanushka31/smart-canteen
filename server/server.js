require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const orderRoutes = require("./routes/orderRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/inventory", inventoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "SmartCanteen API is running!"
  });
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Frontend and backend are connected!"
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`SmartCanteen server running on port ${PORT}`);
});