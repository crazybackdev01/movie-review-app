import express from "express";
//controllers
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  getAllUsersController,
  getProfileController,
  updateProfileController,
} from "../controllers/User.controller.js";
//middlewares
import {
  isAuthenticate,
  isAuthorizedAdmin,
} from "../middlewares/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .post(registerUserController)
  .get(isAuthenticate, isAuthorizedAdmin, getAllUsersController);
router.route("/auth").post(loginUserController);
router.route("/logout").post(logoutUserController);
router
  .route("/profile")
  .get(isAuthenticate, getProfileController)
  .put(isAuthenticate, updateProfileController);

export default router;
