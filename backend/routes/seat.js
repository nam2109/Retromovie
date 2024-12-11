const express = require("express");
const router = express.Router();
const Seat = require("../models/seat");

// API để lấy dữ liệu ghế
router.get("/", async (req, res) => {
  try {
    const seats = await Seat.find();
    res.json(seats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi lấy dữ liệu ghế" });
  }
});

module.exports = router;
