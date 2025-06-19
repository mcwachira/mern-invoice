import asyncHandler from "express-async-handler";
import User from "../../models/userModel";

// $-title   Get user  Profile
// $-path    POST /api/v1/user/profile
// $-auth    Private

const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  // 0 value is to make sure the values are not inlcuded
  // the lean value is to make the query faster
  const userProfile = await User.findById(userId, {
    refreshToken: 0,
    roles: 0,
    _id: 0,
  }).lean();

  if (!userProfile) {
    res.status(204);

    throw new Error("User profile not found");
  }

  res.status(200).json({
    success: true,
    userProfile,
  });
});

export default getUserProfile;
