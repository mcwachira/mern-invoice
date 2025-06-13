import express from "express";
import registerUser from "../controllers/auth/registerController";
import verifyUserEmail from "../controllers/auth/verifyEmailController";
import { loginLimiter } from "../middleware/apiLimiter";
import loginUser from "../controllers/auth/loginController";
import newAccessToken from "../controllers/auth/refreshTokenController";
import resendEmailVerification from "../controllers/auth/resendVerifyEmailController";

const router = express.Router();

router.post("/register", registerUser);

router.get("/verify/:emailToken/:userId", verifyUserEmail);

router.post("/login", loginLimiter, loginUser);

router.get("/new_access_token", newAccessToken);

router.post("/resend_email_token", resendEmailVerification);

export default router;
