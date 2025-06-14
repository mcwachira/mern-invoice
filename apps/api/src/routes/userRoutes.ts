import express from "express";
import checkAuth from "../middleware/checkAuthMiddlware";
import getUserProfile from "../controllers/user/getUserProfile";
import updateUserProfile from "../controllers/user/updateUserProfile";
import deleteMyAccount from "../controllers/user/deleteMyAccount";
import role from "../middleware/roleMiddlware";
import getAllUserAccounts from "../controllers/user/getAllUserAccounts";

const router = express.Router();

router
  .route("/profile")
  .get(checkAuth, getUserProfile)
  .patch(checkAuth, updateUserProfile)
  .delete(checkAuth, deleteMyAccount);

router
  .route("/all")
  .get(checkAuth, role.checkRoles(role.ROLES.Admin), getAllUserAccounts);

export default router;
