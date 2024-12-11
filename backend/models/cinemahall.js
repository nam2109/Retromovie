const mongoose = require("mongoose");

const cinemaHallSchema = new mongoose.Schema({
  id: String,
  number: Number,
  totalSeat: Number,
  cinemaId: String,
});

const CinemaHall = mongoose.model("CinemaHall", cinemaHallSchema);

module.exports = CinemaHall;
