require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db.js");
const authRoutes = require("./routes/auth.js");
const cartRoutes = require("./routes/cart");
const productRoutes = require("./routes/products");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/products", productRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));