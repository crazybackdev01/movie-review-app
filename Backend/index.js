import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import connectDB from "./config/db.js";
//Routes
import userRoutes from "./routes/user.routes.js";
import genreRoutes from "./routes/genre.routes.js";
import moviesRoutes from "./routes/movies.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
const app = express();

//CONFIGURATIONS
dotenv.config();

const PORT = process.env.PORT || 3000;
connectDB();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(cors({ origin: "http://localhost:5173" }));

//ROUTES
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genre", genreRoutes);
app.use("/api/v1/movies", moviesRoutes);
app.use("/api/v1/upload", uploadRoutes);

//Serving Static files route
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.listen(PORT, () => {
  //connectDB();
  console.log(`listening on ${process.env.PORT}`);
});
