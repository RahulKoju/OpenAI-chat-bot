import Joi from "joi";

// Sign In Schema
export const signInSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address.",
    "any.required": "Email is required.",
  }),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,30}$"
      )
    ) // Updated pattern
    .required()
    .messages({
      "string.pattern.base":
        "Password must be 8-30 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character.",
      "any.required": "Password is required.",
    }),
});

// Sign Up Schema
export const signUpSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.min": "Full name must be at least 3 characters long.",
    "string.max": "Full name cannot be longer than 30 characters.",
    "any.required": "Full name is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address.",
    "any.required": "Email is required.",
  }),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,30}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be 8-30 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character.",
      "any.required": "Password is required.",
    }),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base": `Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.`,
      "string.empty": `Password cannot be empty`,
      "any.required": `Password is required`,
    }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": `Passwords do not match`,
    "string.empty": `Confirm Password cannot be empty`,
    "any.required": `Confirm Password is required`,
  }),
});

export const chatCompletionSchema = Joi.object({
  message: Joi.string().required().messages({
    "string.empty": "Message is required",
  }),
});