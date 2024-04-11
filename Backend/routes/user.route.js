import express from "express";
//controllers
import { registerUserController } from "../controllers/User.controller.js";
//middlewares

const router = express.Router();

router.route("/").post(registerUserController);

export default router;
