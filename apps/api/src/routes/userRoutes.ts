import express from "express";
import checkAuth from "../middleware/checkAuthMiddlware";
import getUserProfile from "../controllers/user/getUserProfile";

const router = express.Router();

router.route("/profile").get(checkAuth, getUserProfile);

export default router;
