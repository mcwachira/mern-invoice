import express from "express";
import { Request, Response, NextFunction } from "express";
import registerUser from "../controllers/auth/registerController";
import verifyUserEmail from "../controllers/auth/verifyEmailController";
import { loginLimiter } from "../middleware/apiLimiter";
import loginUser from "../controllers/auth/loginController";
import newAccessToken from "../controllers/auth/refreshTokenController";
import resendEmailVerification from "../controllers/auth/resendVerifyEmailController";
import {
  resetPassword,
  resetPasswordRequest,
} from "../controllers/auth/passwordResetController";
import logoutUser from "../controllers/auth/logoutController";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

const router = express.Router();

router.post("/register", registerUser);

router.get("/verify/:emailToken/:userId", verifyUserEmail);

router.post("/login", loginLimiter, loginUser);

router.get("/new_access_token", newAccessToken);

router.post("/resend_email_token", resendEmailVerification);

router.post("/reset_password_request", resetPasswordRequest);

router.post("/reset_password", resetPassword);

router.get("/logout", logoutUser);

router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
    accessType: "offline",
    prompt: "consent",
  }),
);

// $-title   Redirect route to the passport google strategy
// $-path    GET /api/v1/auth/google/redirect

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const existingUser = await User.findById(req.user?.id);
      if (!existingUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const payload = {
        id: existingUser.id,
        roles: existingUser.roles,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        username: existingUser.username,
        provider: existingUser.provider,
        avatar: existingUser.avatar,
      };

      jwt.sign(
        payload,
        process.env.JWT_ACCESS_SECRET_KEY as string,
        { expiresIn: "20m" },
        (err, token) => {
          if (err || typeof token !== "string") {
            res.status(500).json({ message: "Failed to generate token" });
            return;
          }

          const embedJWT = `
            <html>
              <script>
                window.localStorage.setItem("googleToken", '${token}');
                window.location.href = 'http://localhost:8080/dashboard';
              </script>
            </html>
          `;

          res.send(embedJWT);
        },
      );
    } catch (error) {
      next(error);
    }
  },
);
export default router;
