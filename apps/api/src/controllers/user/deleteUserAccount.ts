import asyncHandler from "express-async-handler";
import User from "../../models/userModel";

// $-title   delete User account
// $-path    Patch /api/v1/user/profile/
// $-auth    Private/Admin
// an admin user can delete any other user account

const deleteUserAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    const result = await user.deleteOne();

    res.json({
      success: true,
      message: `User ${result} deleted successfully`,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

export default deleteUserAccount;
