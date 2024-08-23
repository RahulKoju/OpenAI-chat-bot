import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { chatCompletionSchema } from "../utils/validation.util";
import { generateChatCompletion } from "../controllers/chat.controller";
import validation from "../middlewares/validation.middleware";

const router = Router();

router.post(
  "/new",
  verifyToken,
  validation(chatCompletionSchema),
  generateChatCompletion
);

export default router;
