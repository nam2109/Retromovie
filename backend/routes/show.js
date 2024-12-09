// routes/shows.js
const express = require("express");
const router = express.Router();
const Show = require("../models/show");

// API lấy danh sách lịch chiếu theo movieId
router.get("/:movieId", async (req, res) => {
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
router.get("/showId/:id", async (req, res) => {
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

module.exports = router;
