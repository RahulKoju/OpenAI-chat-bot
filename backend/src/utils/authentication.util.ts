import jwt from "jsonwebtoken";

export const createToken = (id: string, email: string, expiresIn: string | number = "7d"): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const payload = {
    id,
    email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });

  return token;
};
