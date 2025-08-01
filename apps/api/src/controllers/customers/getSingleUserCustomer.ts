import asyncHandler from "express-async-handler";
import Customer from "../../models/customerModel";
import { Request, Response } from "express";

// $-title   Get Single  Customers
// $-path    Get /api/v1/customer/:id
// $-auth    Private

const getSingleUserCustomer = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401);
      throw new Error("Unauthorized: No user info in request");
    }

    const customer = await Customer.findById(req.params.id);

    const user = req.user._id;

    if (!customer) {
      res.status(204);
      throw new Error("Customer not found");
    }

    if (customer.id !== user) {
      res.status(200).json({
        success: true,
        customer,
      });
    } else {
      res.status(401);
      throw new Error(
        "You are not authorized to view this customer information as they are not your customer",
      );
    }
  },
);

export default getSingleUserCustomer;
