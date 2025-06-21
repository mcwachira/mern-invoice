import asyncHandler from "express-async-handler";
import Customer from "../../models/customerModel";
import { Request, Response } from "express";

// $-title   Create Customer
// $-path    Patch /api/v1/customer/create
// $-auth    Private

const createCustomer = asyncHandler(async (req: Request, res: Response) => {
  const { email, name, phoneNumber, vatTinNo, address, city, country } =
    req.body;

  if (!email || !name || !phoneNumber) {
    res.status(400);

    throw new Error(
      "a Customer must have atleas an email, name, and phone numer",
    );
  }

  if (!req.user) {
    res.status(401);
    throw new Error("Unauthorized: No user info in request");
  }
  const customerExist = await Customer.findOne({ email });

  if (customerExist) {
    res.status(400);
    throw new Error("The Customer already exist");
  }

  const newCustomer = new Customer({
    createdBy: req.user._id,
    name,
    email,
    phoneNumber,
    vatTinNo,
    address,
    city,
    country,
  });

  const createdCustomer = await newCustomer.save();

  if (!createCustomer) {
    res.status(400);
    throw new Error("Customer could not be created");

    res.status(200).json({
      success: true,
      message: `Your Customer named: ${createdCustomer.name}, was created successfully`,
    });
  }
});

export default createCustomer;
