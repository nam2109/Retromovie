const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  posterTrailer: {
    type: String,
    required: true,
  },
  trailer: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  actors: {
    type: [String],
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
