require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db.js");
const authRoutes = require("./routes/auth.js"); // now CommonJS
const cartRoutes = require("./routes/cart");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);

/* Route 1: Get ALL products */
app.get("/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM items");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/* Route 2: Get ONLY featured products */
app.get("/products/featured", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM items WHERE features = TRUE");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));