import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.utils";
import { createToken } from "../utils/authentication.util";
import { COOKIE_NAME } from "../utils/constants.util";

// Handle Sign Up
export const handleSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Validate request data
    if (
      !name ||
      !email ||
      !password ||
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      return next(errorHandler(400, "All fields are required."));
    }

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return next(errorHandler(409, "User with given email already exists!"));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(200).json({ message: "Sign Up successful" });
  } catch (error) {
    next(error);
  }
};

// Handle Sign In
export const handleSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(401, "User not found"));
    }

    // Compare passwords
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return next(errorHandler(403, "Incorrect password"));
    }
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      httpOnly: true,
      signed: true,
    });
    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      expires,
      httpOnly: true,
      signed: true,
    });
    res.status(200).json({ message: "Sign In successful" });
  } catch (error) {
    next(error);
  }
};
