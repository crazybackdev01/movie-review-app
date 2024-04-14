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
const loginUserController = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordValid = bcrypt.compare(password, existingUser.password);

    if (isPasswordValid) {
      generateToken(res, existingUser._id);
      //by above line, a new variable userId will be created which we will get after verifying this token by jwt.verify() function as response.userId

      res.status(200).json({
        userId: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } else {
    res.status(401).json({ message: "User not found" });
  }
});

//LOGOUT
const logoutUserController = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
});

//GET USERS as ADMIN
const getAllUsersController = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({ users });
});

//GET PROFILE
const getProfileController = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      userId: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

//UPDATE PROFILE
const updateProfileController = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.user._id);
  //user will include all the data including hashed password string also....

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const newHashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = newHashedPassword;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      userId: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Token expired or User not found");
  }
});

export {
  registerUserController,
  loginUserController,
  logoutUserController,
  getAllUsersController,
  getProfileController,
  updateProfileController,
};
