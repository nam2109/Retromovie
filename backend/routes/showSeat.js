const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ShowSeat = require("../models/showSeat"); // Đường dẫn tới file model ShowSeat

// API lấy dữ liệu ghế đã đặt (showSeats) theo showId
router.get("/:showId", async (req, res) => {
  const { showId } = req.params;
  try {
    // Tìm tất cả các ghế đã đặt cho showId
    const showSeats = await ShowSeat.find({ showId: showId });
    res.json(showSeats); // Trả về danh sách ghế đã đặt
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi lấy dữ liệu ghế đã đặt" });
  }
});
router.post("/book", async (req, res) => {
  try {
    const { seats } = req.body;
    if (!seats || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({ message: "Danh sách ghế không hợp lệ" });
    }

    await ShowSeat.insertMany(seats);
    res.status(201).json({ message: "Đặt ghế thành công" });
  } catch (error) {
    console.error("Lỗi khi lưu ghế vào MongoDB:", error);
    res.status(500).json({ message: "Lỗi khi đặt ghế", error });
  }
});

module.exports = router;
