// models/Cinema.js
const mongoose = require("mongoose");

const cinemaSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  totalHall: { type: Number, required: true },
});

module.exports = mongoose.model("Cinema", cinemaSchema);
