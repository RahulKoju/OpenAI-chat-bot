import { NextFunction, Request, Response } from "express";
import { COOKIE_NAME } from "../utils/constants.util";
import { errorHandler } from "../utils/error.utils";
import { validateToken } from "../utils/authentication.util";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  if (!token) {
    return next(errorHandler(401, "Unauthorised"));
  }
  const userPayload = validateToken(token);
  if (!userPayload) {
    return next(errorHandler(401, "Unauthorised"));
  }
  res.locals.jwtData = userPayload;
  next();
};
