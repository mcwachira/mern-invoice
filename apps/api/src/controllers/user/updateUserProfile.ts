import asyncHandler from "express-async-handler";
import User from "../../models/userModel";

// $-title   Update user  Profile
// $-path    Patch /api/v1/user/profile
// $-auth    Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const {
    password,
    passwordConfirm,
    email,
    isEmailVerified,
    provider,
    roles,
    googleID,
    username,
  } = req.body;

  // 0 value is to make sure the values are not inlcuded
  // the lean value is to make the query faster
  const user = await User.findById(userId);

  if (!user) {
    res.status(400);

    throw new Error("The user does not exisit in our system ");
  }

  if (password || passwordConfirm) {
    res.status(400);
    throw new Error(
      " Thies toute is not for password updates, Please use the passwor dreset functionality instead",
    );
  }

  if (email || isEmailVerified || provider || roles || googleID) {
    res.status(400);
    throw new Error("You are not allowed to update that field on this route");
  }

  const fieldsToUpdate = req.body;

  const updatedProfile = await User.findByIdAndUpdate(
    userId,
    { ...fieldsToUpdate },
    { new: true, rundValidators: true },
  ).select("-refreshToken");

  res.status(200).json({
    success: true,
    message: `${user.firstName} ${user.lastName}, your profile was successfull updated`,
    updatedProfile,
  });
});

export default updateUserProfile;
