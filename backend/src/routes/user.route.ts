import { Router } from "express";
import { handleGetAllUsers, handleSignup } from "../controllers/user.controller";

const router = Router();

router.get("/getallusers", handleGetAllUsers);
router.post("/signup", handleSignup);

export default router;
