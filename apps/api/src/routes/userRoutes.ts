import express from "express";
import checkAuth from "../middleware/checkAuthMiddlware";
import getUserProfile from "../controllers/user/getUserProfile";
import updateUserProfile from "../controllers/user/updateUserProfile";
import deleteMyAccount from "../controllers/user/deleteMyAccount";
import role from "../middleware/roleMiddlware";
import getAllUserAccounts from "../controllers/user/getAllUserAccounts";
import deleteUserAccount from "../controllers/user/deleteUserAccount";
import deactivateUserAcount from "../controllers/user/deactivateUserAccount";

const router = express.Router();

router
  .route("/profile")
  .get(checkAuth, getUserProfile)
  .patch(checkAuth, updateUserProfile)
  .delete(checkAuth, deleteMyAccount);

router
  .route("/all")
  .get(checkAuth, role.checkRoles(role.ROLES.Admin), getAllUserAccounts);
router
  .route("/:id")
  .patch(checkAuth, role.checkRoles(role.ROLES.Admin), deactivateUserAcount)
  .delete(checkAuth, role.checkRoles(role.ROLES.Admin), deleteUserAccount);
export default router;
