// routes/shows.js
const express = require("express");
const router = express.Router();
const Show = require("../models/show");

// API lấy danh sách lịch chiếu theo movieId
router.get("/nam/:movieId", async (req, res) => {
  const { movieId } = req.params;
  try {
    const shows = await Show.find({ movieId: Number(movieId) });
    res.json(shows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Route to get show details by ID
router.get("/nam/showId/:id", async (req, res) => {
  try {
    const showId = req.params.id;
    const show = await Show.findOne({ id: showId });
    if (show) {
      res.json(show);
    } else {
      res.status(404).send("Show not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

//khang------------------------------------------------------
// API thêm showtime
router.post("/khang", async (req, res) => {
  try {
    const {
      showId,
      movieName,
      movieId,
      cinemaHallId,
      createOn,
      startTime,
      endTime,
      price,
    } = req.body;

    if (
      !showId ||
      !movieId ||
      !movieName ||
      !cinemaHallId ||
      !createOn ||
      !startTime ||
      !endTime ||
      !price
    ) {
      return res.status(400).json({ error: "Tất cả các trường là bắt buộc." });
    }

    const createOnDate = new String(createOn);
    const startTimeDate = new String(startTime);
    const endTimeDate = new String(endTime);

    if (startTimeDate >= endTimeDate) {
      return res
        .status(400)
        .json({ error: "Thời gian bắt đầu phải trước thời gian kết thúc." });
    }

    if (price <= 0) {
      return res.status(400).json({ error: "Giá phải lớn hơn 0." });
    }

    const existingShow = await Show.findOne({ showId });
    if (existingShow) {
      return res.status(400).json({ error: "ShowId này đã tồn tại." });
    }

    const newShowtime = new Show({
      showId,
      movieName,
      movieId,
      cinemaHallId,
      createOn: createOnDate,
      startTime: startTimeDate,
      endTime: endTimeDate,
      price,
    });

    const savedShowtime = await newShowtime.save();
    res.status(201).json({
      message: "Lịch chiếu đã được thêm thành công!",
      showtime: savedShowtime,
    });
  } catch (error) {
    console.error("Error creating showtime:", error);
    res.status(500).json({
      error: "Có lỗi xảy ra khi thêm lịch chiếu. Vui lòng thử lại sau.",
    });
  }
});

// Cập nhật ShowTime
router.put("/khang/:id", async (req, res) => {
  const showId = req.params.id;
  const updatedData = req.body;

  try {
    const result = await Show.findOneAndUpdate(
      { showId: showId },
      { $set: updatedData },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating showtime:", error);
    res.status(500).json({ message: "Failed to update showtime" });
  }
});

// Xóa showtime theo ID
router.delete("/khang/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Show.findOneAndDelete({ showId: id });

    if (result) {
      res.status(200).json({ message: "Lịch chiếu đã được xóa." });
    } else {
      res.status(404).json({ message: "Không tìm thấy lịch chiếu." });
    }
  } catch (error) {
    console.error("Error deleting showtime:", error);
    res.status(500).json({ message: "Lỗi server. Không thể xóa lịch chiếu." });
  }
});

// Cập nhật ShowTime
router.put("/khang/:id", async (req, res) => {
  const showId = req.params.id;
  const updatedData = req.body;

  try {
    const result = await Show.findOneAndUpdate(
      { showId: showId },
      { $set: updatedData },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating showtime:", error);
    res.status(500).json({ message: "Failed to update showtime" });
  }
});

//khang----------------------------------------------------------------
//lấy danh sách showtime
router.get("/khang", async (req, res) => {
  try {
    const shows = await Show.find();
    res.json(shows);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
