const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  id: Number,
  movieId: Number,
  cinemaHallId: String,
  startTime: String,
  endTime: String,
  createOn: String,
  price: Number,
});

const Show = mongoose.model("Show", movieSchema);

module.exports = Show;
