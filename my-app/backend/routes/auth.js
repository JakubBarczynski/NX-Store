const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db.js"); // your db.js already uses require
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET not set");
}

const codes = new Map();
// SIGNUP
router.post("/signup", async (req, res) => {
  const { email, password, full_name, code_input } = req.body;

  if (code_input === codes.get(email)){
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await pool.query(
        "INSERT INTO users (email, password_hash, full_name) VALUES ($1,$2,$3) RETURNING id,email,full_name",
        [email, hashedPassword, full_name]
      );

      const user = result.rows[0];
      codes.delete(email);
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
      res.status(201).json({ token, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "User already exists or server error" });
    }
  } else {
    res.status(400).json({ error: "Invalid verification code" });
  }
});

router.post("/send-code", async (req, res) => {
  try {
    const { email } = req.body;
    // Check if email already exists
    const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "An account with this email already exists" });
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    codes.set(email, code);
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "DO NOT SHARE",
      text: code
    });
    res.json({ success: true })
  } catch {
    res.json({ success: false })
  }
})

router.post("/send-reset-code", async (req, res) => {
  try {
    const { email } = req.body;
    // Check if email already exists
    const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rows.length === 0) {
    return res.status(400).json({ error: "No account found with this email" }); }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    codes.set(email, code);
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "DO NOT SHARE",
      text: code
    });
    res.json({ success: true })
  } catch {
    res.json({ success: false })
  }
})

router.post("/reset-password", async (req, res) => {
  const { email, password, code_input } = req.body;
  try {
    if (code_input !== codes.get(email)) {
      return res.status(400).json({ error: "Invalid verification code" });
    }
    codes.delete(email);
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query("UPDATE users SET password_hash = $1 WHERE email = $2", [hashedPassword, email])
    res.json({ success: true })
  } catch {
    res.json({ success: false })
  }
})

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    const user = result.rows[0];
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, email: user.email, full_name: user.full_name, is_admin: user.is_admin } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// AUTH MIDDLEWARE
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = router;
module.exports.authMiddleware = authMiddleware;