import asyncHandler from "express-async-handler";
import User from "../../models/userModel";

// $-title   delete my account
// $-path    Patch /api/v1/user/profile/delete
// $-auth    Private

const deleteUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  await User.findByIdAndDelete(userId);

  res.json({
    success: true,
    message: "Your account has been succsefully  been deleted",
  });
});

export default deleteUserProfile;
