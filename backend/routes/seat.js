const express = require("express");
const router = express.Router();
const Seat = require("../models/seat"); // Import mô hình Seat

// API để lấy dữ liệu ghế
router.get("/", async (req, res) => {
  try {
    const seats = await Seat.find(); // Lấy tất cả dữ liệu ghế
    res.json(seats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi lấy dữ liệu ghế" });
  }
});

module.exports = router;
