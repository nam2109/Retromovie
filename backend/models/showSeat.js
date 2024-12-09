const mongoose = require("mongoose");

const showSeatSchema = new mongoose.Schema({
  seatId: { type: mongoose.Schema.Types.String, ref: "Seat", required: true }, // Liên kết với Seat
  row: { type: String, required: true },
  col: { type: Number, required: true },
  isReverse: { type: Boolean, default: false }, // Ghế đặt ngược
  showId: { type: Number, required: true }, // Liên kết với show cụ thể
});

module.exports = mongoose.model("ShowSeat", showSeatSchema);
