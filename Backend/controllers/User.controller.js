import User from "../models/User.models.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  isAuthenticate,
  isAuthorizedAdmin,
} from "../middlewares/authMiddleware.js";
import generateToken from "../utils/generateToken.js";

//REGISTER
const registerUserController = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(401);
    throw new Error("Invalid Entries, ALL compulsory fields are required");
  }

  //Checking the Already exisisting userlist
  const userExists = await User.findOne({ email });
  if (userExists) res.status(401).send("User already exists");

  //Hash the User password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  //Saving the new User and generating the token for the new user
  try {
    await newUser.save();
    generateToken(res, newUser._id);

    res.status(200).json({
      userId: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(404);
    throw new Error("User cannot be saved");
  }
});

//LOGIN

export { registerUserController };
