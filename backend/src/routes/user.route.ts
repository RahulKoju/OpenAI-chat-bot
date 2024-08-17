import { Router } from "express";
import { handleGetAllUsers } from "../controllers/user.controller";
import { handleSignUp } from "../controllers/auth.controller";
import validation from "../middlewares/validation.middleware";
import { signUpSchema } from "../utils/validation.util";

const router = Router();

router.get("/getallusers", handleGetAllUsers);
router.post("/signup", validation(signUpSchema), handleSignUp);

export default router;
