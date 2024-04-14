import express from "express";
//Controllers
import {
  createGenreController,
  updateGenreController,
  deleteGenreController,
  getAllGenreController,
  readGenreController,
} from "../controllers/Genre.controller.js";
//Middlewares
import {
  isAuthenticate,
  isAuthorizedAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

//ROUTES
router
  .route("/")
  .post(isAuthenticate, isAuthorizedAdmin, createGenreController);
router
  .route("/:id")
  .put(isAuthenticate, isAuthorizedAdmin, updateGenreController);
router
  .route("/:id")
  .delete(isAuthenticate, isAuthorizedAdmin, deleteGenreController);
router.route("/genres").get(getAllGenreController);
router.route("/:id").get(readGenreController);
export default router;
