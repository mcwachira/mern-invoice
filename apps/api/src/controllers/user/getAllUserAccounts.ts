import asyncHandler from "express-async-handler";
import User from "../../models/userModel";

// $-title   delete my account
// $-path    Patch /api/v1/user/all
// $-auth    Private/Admin

const getAllUserAccounts = asyncHandler(async (req, res) => {
  const pageSize = 10;

  const page = Number(req.query.pageNumber) || 1;

  const count = await User.countDocuments({});

  const users = await User.find()
    .sort({ createdAt: -1 })
    .select("-refreshToken")
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .lean();

  res.json({
    success: true,
    count,
    numberOfPages: Math.ceil(count / pageSize),
    users,
  });
});

export default getAllUserAccounts;
