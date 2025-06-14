import express from "express";
import checkAuth from "../middleware/checkAuthMiddlware";
import getUserProfile from "../controllers/user/getUserProfile";
import updateUserProfile from "../controllers/user/updateUserProfile";
import deleteMyAccount from "../controllers/user/deleteMyAccount";

const router = express.Router();

router
  .route("/profile")
  .get(checkAuth, getUserProfile)
  .patch(checkAuth, updateUserProfile)
  .delete(checkAuth, deleteMyAccount);

export default router;
