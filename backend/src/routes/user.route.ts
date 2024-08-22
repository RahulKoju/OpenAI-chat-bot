import { Router } from "express";
import { handleGetAllUsers } from "../controllers/user.controller";
import { handleSignIn, handleSignUp } from "../controllers/auth.controller";
import validation from "../middlewares/validation.middleware";
import { signInSchema, signUpSchema } from "../utils/validation.util";
import { verifyUser } from "../utils/verifyUser.util";
import { verifyToken } from "../middlewares/verifyToken.middleware";

const router = Router();

router.get("/getallusers", handleGetAllUsers);
router.post("/signup", validation(signUpSchema), handleSignUp);
router.post("/signin", validation(signInSchema), handleSignIn);
router.get("/check-status", verifyToken, verifyUser);

export default router;
