import express from "express";
//controllers
//middlewares

const router = express.Router();

router.route("/").post(createUserController);

export default router;
