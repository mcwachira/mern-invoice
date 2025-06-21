import asyncHandler from "express-async-handler";
import Customer from "../../models/customerModel";
import { Request, Response } from "express";

// $-title  Delete Customer
// $-path    Delete /api/v1/customer/:id
// $-auth    Private

const deleteCustomer = asyncHandler(async (req: Request, res: Response) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    res.status(404);
    throw new Error("That customer does not exist");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("Unauthorized: No user info in request");
  }

  if (customer.createdBy.toString() !== req.user.id) {
    res.status(401);

    throw new Error(
      "You are not authorized to delete this customer .He/She is not your customer",
    );
  }

  await customer.deleteOne();

  res.status(200).json({
    success: true,
    message: `${customer.name}'s was succesfully deleted`,
  });
});

export default deleteCustomer;
