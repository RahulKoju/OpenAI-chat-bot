import { Request, Response, NextFunction } from "express";
import { Schema } from "joi"; // Import the Schema type from Joi

const validation = (validationSchema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = validationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    next();
  };
};

export default validation;
