import asyncHandler from "express-async-handler";
import Customer from "../../models/customerModel";
import { Request, Response } from "express";

// $-title   Get All  Customers
// $-path    Get /api/v1/customer/
// $-auth    Private

const getAllUserCustomers = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401);
      throw new Error("Unauthorized: No user info in request");
    }

    const pageSize = 10;
    const page = Number(req.query.page) || 1;
    const count = await Customer.countDocuments({ createdBy: req.user._id });

    const customers = await Customer.find({
      createdBy: req.user._id,
    })
      .sort({
        createdAt: 1,
      })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .lean();

    res.json({
      success: true,
      totlaCustomers: count,
      numberOfPages: Math.ceil(count / pageSize),
      myCustomers: customers,
    });
  },
);

export default getAllUserCustomers;
