import express from "express";
//Controllers
import {
  createMovieController,
  getAllMoviesController,
  getSpecificMovieController,
  postReviewController,
  updateMovieController,
  getNewMoviesController,
  getTopMoviesController,
  getRandomMoviesController,
  deleteMovieController,
  deleteCommentController,
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
router.get("/new-movies", getNewMoviesController);
router.get("/top-movies", getTopMoviesController);
router.get("/random-movies", getRandomMoviesController);

//Private routes(Logged In Users)
router.post("/:id/reviews", isAuthenticate, checkId, postReviewController);

//Admin
router.post(
  "/create",
  isAuthenticate,
  isAuthorizedAdmin,
  createMovieController
);
router.put(
  "/update-movie/:id",
  isAuthenticate,
  isAuthorizedAdmin,
  updateMovieController
);
router.delete(
  "/delete-movie/:id",
  isAuthenticate,
  isAuthorizedAdmin,
  deleteMovieController
);
router.delete(
  "/delete-comment",
  isAuthenticate,
  isAuthorizedAdmin,
  deleteCommentController
);
export default router;
