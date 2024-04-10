import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import connectDB from "./config/db.js";
const app = express();

//CONFIGURATIONS
dotenv.config();

const PORT = process.env.PORT || 3000;
connectDB();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//ROUTES
// app.use("/api/v1/users", userRoutes);
// app.use("/api/v1/genre", genreRoutes);
// app.use("/api/v1/movies", moviesRoutes);
// app.use("/api/v1/upload", uploadRoutes);

app.listen(PORT, (error) => {
  //   connectDB();
  console.log(`listening on ${process.env.PORT}`);
});
