import asyncHandler from "express-async-handler";
import Customer from "../../models/customerModel";
import { Request, Response } from "express";

// $-title   Update Customer
// $-path    Patch /api/v1/customer/:id
// $-auth    Private

const updateCustomerInfo = asyncHandler(async (req: Request, res: Response) => {
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
      "You are not authorized to update this customer's information.He/She is not your customer",
    );
  }

  const { id: _id } = req.params;

  const fieldsToUpdate = req.body;

  const updatedCustomerInfo = await Customer.findByIdAndUpdate(
    _id,
    {
      ...fieldsToUpdate,
      _id,
    },
    { new: true, runValidators: true },
  );

  res.status(200).json({
    success: true,
    message: `${customer.name}'s info ws successfully updated`,
    updatedCustomerInfo,
  });
});

export default updateCustomerInfo;
