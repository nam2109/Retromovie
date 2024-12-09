// routes/cinemas.js
const express = require("express");
const router = express.Router();
const Cinema = require("../models/cinema");

// API lấy danh sách rạp
router.get("/", async (req, res) => {
  try {
    const cinemas = await Cinema.find();
    res.json(cinemas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
