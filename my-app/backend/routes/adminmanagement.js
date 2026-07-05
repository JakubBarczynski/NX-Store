const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const router = express.Router();

router.post("/admin", async(req, res) => {

})

const adminMiddleware = (req, res, next) => {
    
}