import express from "express";
//Controllers
import {
  createMovieController,
  getAllMoviesController,
  getSpecificMovieController,
} from "../controllers/Movie.controller.js";
//Middlewares
import {
  isAuthenticate,
  isAuthorizedAdmin,
} from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

const router = express.Router();
//Public routes
router.get("/all-movies", getAllMoviesController);
router.get("/specific-movie/:id", getSpecificMovieController);

//Admin
router.post(
  "/create",
  isAuthenticate,
  isAuthorizedAdmin,
  createMovieController
);
export default router;
