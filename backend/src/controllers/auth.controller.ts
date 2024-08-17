import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
export const handleSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    return res.status(200).json({ message: "Sign Up successful" });
  } catch (error) {
    next(error);
  }
};
