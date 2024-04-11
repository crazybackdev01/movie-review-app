import jwt from "jsonwebtoken";
import User from "../models/User.models.js";
import asyncHandler from "./asyncHandler.js";

//Check if user is authenticated or not
const isAuthenticate = asyncHandler(async (req, res, next) => {
  let token;

  //Read JWT token from 'jwt' cookie
  token = req.cookies.jwt;
  if (token) {
    try {
      //Basically we are verifying again because Every JWT token has a Expiry duration which is called Access token.....
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decodedToken.userId);
      req.user = await User.findById(decodedToken.userId).select("-password");
      //req.user and req.user._doc will give same output
      console.log(req.user);
      next();
    } catch (error) {
      res.status(404);
      throw new Error("Not authorized to access resource");
    }
  } else {
    res.status(401);
    throw new Error(
      "Not authorized or not valid token or Access Token expired"
    );
  }
});

//Check if the user is admin or not
// This middleware will execute after the isAuthenticate Middleware because only then req.user will be filled with data
const isAuthorizedAdmin = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  console.log("Admin", req.user.isAdmin);
  console.log("Username", req.user.username);
  console.log("doc", req.user._doc);
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as Admin" });
  }
});

export { isAuthenticate, isAuthorizedAdmin };
