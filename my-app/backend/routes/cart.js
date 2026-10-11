const express = require("express");
const router = express.Router();
const pool = require("../db");
const { authMiddleware } = require("./auth");

// GET USER CART
router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT cart.product_id, cart.quantity, cart.size, items.name, items.price, items.image
       FROM cart
       JOIN items ON cart.product_id = items.id
       WHERE cart.user_id = $1
       ORDER BY cart.product_id ASC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// ADD ITEM
router.post("/add", authMiddleware, async (req, res) => {
  const { productId, size } = req.body;
  try {
    const existing = await pool.query(
      "SELECT * FROM cart WHERE user_id=$1 AND product_id=$2 AND size=$3",
      [req.user.id, productId, size]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        "UPDATE cart SET quantity = quantity + 1 WHERE user_id=$1 AND product_id=$2 AND size=$3",
        [req.user.id, productId, size]
      );
    } else {
      await pool.query(
        "INSERT INTO cart (user_id, product_id, quantity, size) VALUES ($1,$2,1,$3)",
        [req.user.id, productId, size]
      );
    }
    res.json({ message: "Added to cart" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// DECREASE QUANTITY
router.put("/decrease/:productId/:size", authMiddleware, async (req, res) => {
  try {
    const existing = await pool.query(
      "SELECT * FROM cart WHERE user_id=$1 AND product_id=$2 AND size=$3",
      [req.user.id, req.params.productId, req.params.size]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (existing.rows[0].quantity === 1) {
      await pool.query(
        "DELETE FROM cart WHERE user_id=$1 AND product_id=$2 AND size=$3",
        [req.user.id, req.params.productId, req.params.size]
      );
    } else {
      await pool.query(
        "UPDATE cart SET quantity = quantity - 1 WHERE user_id=$1 AND product_id=$2 AND size=$3",
        [req.user.id, req.params.productId, req.params.size]
      );
    }

    res.json({ message: "Quantity decreased" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// REMOVE ITEM
router.delete("/:productId/:size", authMiddleware, async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM cart WHERE user_id=$1 AND product_id=$2 AND size=$3",
      [req.user.id, req.params.productId, req.params.size]
    );
    res.json({ message: "Item removed" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;