import { Router } from "express";
import userController from "../controllers/userController";

const router = Router();

router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.signIn);
router.post("/profile-edit", userController.editProfile);

export default router;
