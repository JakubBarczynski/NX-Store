const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET featured products
router.get("/featured", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.*,
        COALESCE(array_agg(DISTINCT pi.image_url) FILTER (WHERE pi.image_url IS NOT NULL), '{}') AS images,
        COALESCE((
          SELECT array_agg(ps2.size ORDER BY ps2.position)
          FROM product_sizes ps2
          WHERE ps2.product_id = p.id
        ), '{}') AS sizes
      FROM items p
      LEFT JOIN product_images pi ON pi.product_id = p.id
      WHERE p.features = TRUE
      GROUP BY p.id
    `);

    res.json(result.rows);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET all products
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.*,
        COALESCE(array_agg(DISTINCT pi.image_url) FILTER (WHERE pi.image_url IS NOT NULL), '{}') AS images,
        COALESCE((
          SELECT array_agg(ps2.size ORDER BY ps2.position)
          FROM product_sizes ps2
          WHERE ps2.product_id = p.id
        ), '{}') AS sizes
      FROM items p
      LEFT JOIN product_images pi ON pi.product_id = p.id
      GROUP BY p.id
    `);

    res.json(result.rows);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;