import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.utils";
import { createToken } from "../utils/authentication.util";
import { COOKIE_NAME } from "../utils/constants.util";

const isProduction = process.env.NODE_ENV === "production";
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

    res.status(200).json({
      message: "Sign Up successful",
      name: user.name,
      email: user.email,
    });
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

    // Common cookie options
    const cookieOptions = {
      path: "/",
      httpOnly: true,
      signed: true,
      sameSite: isProduction ? ("none" as const) : ("lax" as const),
      secure: isProduction,
    };

    // Clear existing cookie
    res.clearCookie(COOKIE_NAME, cookieOptions);

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    // Set new cookie
    res.cookie(COOKIE_NAME, token, {
      ...cookieOptions,
      expires,
    });

    res.status(200).json({
      message: "Sign In successful",
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

export const handleLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return next(
        errorHandler(401, "User not registered or token malfunctions")
      );
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return next(errorHandler(401, "Permission didn't match"));
    }
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      httpOnly: true,
      signed: true,
      sameSite: isProduction ? ("none" as const) : ("lax" as const),
      secure: isProduction,
    });
    res.status(200).json({
      message: "Logged Out",
    });
  } catch (error) {
    next(error);
  }
};
