const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const Movie = require("../models/movie");
// Route API để lấy danh sách phim
router.get("/nam", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).send(err);
  }
});
// Route to get movie details by ID
router.get("/nam/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findOne({ id: movieId });
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).send("Movie not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});
//hao----------------------------------------------------------------
// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../frontend/public/img/")); // Store images in public/img folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Get all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new movie
router.post(
  "/",
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "posterTrailer", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        id,
        title,
        director,
        description,
        duration,
        releaseDate,
        trailer,
        genres,
        actors,
        country,
      } = req.body;

      const poster = req.files.poster
        ? `../public/img/${req.files.poster[0].filename}`
        : null;
      const posterTrailer = req.files.posterTrailer
        ? `../public/img/${req.files.posterTrailer[0].filename}`
        : null;

      const newMovie = new Movie({
        id,
        title,
        director,
        description,
        duration,
        releaseDate,
        poster,
        posterTrailer,
        trailer,
        genres: genres.split(","),
        actors: actors.split(","),
        country,
      });

      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// Update a movie
router.put(
  "/:id",
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "posterTrailer", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        id,
        title,
        director,
        description,
        duration,
        releaseDate,
        trailer,
        genres,
        actors,
        country,
      } = req.body;

      const updatedData = {
        id,
        title,
        director,
        description,
        duration,
        releaseDate,
        trailer,
        genres: genres.split(","),
        actors: actors.split(","),
        country,
      };

      if (req.files.poster) {
        updatedData.poster = `../public/img/${req.files.poster[0].filename}`;
      }
      if (req.files.posterTrailer) {
        updatedData.posterTrailer = `../public/img/${req.files.posterTrailer[0].filename}`;
      }

      const updatedMovie = await Movie.findOneAndUpdate(
        { id: req.params.id },
        updatedData,
        { new: true }
      );

      if (!updatedMovie) {
        return res.status(404).json({ message: "Movie not found" });
      }

      res.json(updatedMovie);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Delete a movie
router.delete("/:id", async (req, res) => {
  try {
    const deletedMovie = await Movie.findOneAndDelete({ id: req.params.id });
    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get movie by ID
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findOne({ id: req.params.id });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//hao----------------------------------------------------------------

module.exports = router;
