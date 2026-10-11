require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const pool = require("./db.js");
const authRoutes = require("./routes/auth.js");
const cartRoutes = require("./routes/cart");
const productRoutes = require("./routes/products");
const checkoutRoutes = require("./routes/checkout");

const app = express();

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per 15 minutes per IP
    message: { error: "Too many requests, please try again later" }
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, // stricter limit for auth routes
    message: { error: "Too many attempts, please try again later" }
});

// CORS
app.use(cors({
    origin: "http://localhost:5173", // update this to your Vercel URL when deployed
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use("/checkout/webhook", express.raw({ type: "application/json" }));
app.use(express.json());
app.use(limiter);

app.use("/auth", authLimiter, authRoutes);
app.use("/cart", cartRoutes);
app.use("/products", productRoutes);
app.use("/checkout", checkoutRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));