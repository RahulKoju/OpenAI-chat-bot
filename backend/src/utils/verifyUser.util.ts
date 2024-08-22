import { NextFunction, Request, Response } from "express";
import { errorHandler } from "./error.utils";
import User from "../models/user.model";

export const verifyUser = async (
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
    res.status(200).json({
      message: "Authenticated",
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};
