const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  id: String,
  row: String,
  col: Number,
  cinemaHall: [String],
  isSold: { type: Boolean, default: false },
});

module.exports = mongoose.model("Seat", seatSchema);
