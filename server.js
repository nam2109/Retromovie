const express = require("express");
const path = require("path");
const port = 3001;
const app = express();
const mongoose = require("./backend/db/connection");
const movieRoutes = require("./backend/routes/movie");
const showRoutes = require("./backend/routes/show");
const seatRoutes = require("./backend/routes/seat");
const showseatRoutes = require("./backend/routes/showSeat");
const CinemaHall = require("./backend/models/cinemahall");

// Middleware để phục vụ các tệp tĩnh từ thư mục public
app.use(express.static(path.join(__dirname, "frontend/public")));

// Thêm middleware để phục vụ CSS từ thư mục css
app.use("/css", express.static(path.join(__dirname, "frontend/css")));

// Để giữ đường dẫn "../public/img/image.png", cần thêm middleware để phục vụ từ public
app.use("/public", express.static(path.join(__dirname, "frontend/public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/html/Home.html"));
});

//hào--------------------------
app.get("/frontend/html/admin_user.html", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/html/admin_user.html"));
});
app.get("/movie/add.html", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/html/admin_movie.html"));
});
//hào--------------------------
//khang--------------------------------------------------------
app.get("/show/add.html", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/html/admin_showtime.html"));
});

//khang--------------------------------------------------------

app.get("/movie/details.html", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/html/movieDetail.html"));
});
app.get("/seat.html", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/html/seat.html"));
});

app.use(express.json()); // Middleware để xử lý JSON từ request body
// Use the movie routes
app.use("/api/movies", movieRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/showseats", showseatRoutes); // Kết nối routes showseats

//khang--------------------------------------------------------

// lấy danh sách số lượng sảnh trong db
app.get("/api/cinemahall", async (req, res) => {
  try {
    const cinemaHalls = await CinemaHall.find({}, "id");
    res.status(200).json(cinemaHalls);
  } catch (error) {
    console.error("Error fetching cinemas:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách rạp chiếu." });
  }
});

//khang--------------------------------------------------------

app.listen(port, () => {
  console.log(`Server listening on port http://127.0.0.1:${port}`);
});
