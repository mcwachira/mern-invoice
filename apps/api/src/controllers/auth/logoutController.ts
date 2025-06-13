import asyncHandler from "express-async-handler";
import User from "../../models/userModel";
import { HydratedDocument } from "mongoose";
import { IUser } from "../../types/user";

// $-title   Logout user
// $-path    Get /api/v1/auth/logout
// $-auth    Public

const logoutUser = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    res.sendStatus(204);
    throw new Error("No cookie found");
  }

  const refreshToken = cookies.jwt;

  const existingUser = (await User.findOne({
    refreshToken,
  }).exec()) as HydratedDocument<IUser>;
  if (!existingUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.sendStatus(204);
  }

  existingUser.refreshToken = existingUser.refreshToken.filter(
    (refT) => refT !== refreshToken,
  );
  await existingUser.save();

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({
    success: true,
    message: `${existingUser.firstName},you have been logged out successfully`,
  });
});

export default logoutUser;
