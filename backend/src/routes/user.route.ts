import { Router } from "express";
import { handleGetAllUsers } from "../controllers/user.controller";
import { handleSignUp } from "../controllers/auth.controller";

const router = Router();

router.get("/getallusers", handleGetAllUsers);
router.post("/signup", handleSignUp);

export default router;
