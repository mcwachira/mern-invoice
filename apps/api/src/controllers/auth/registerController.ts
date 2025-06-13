import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../../models/userModel";
import VerificationToken from "../../models/verifyResetTokenModel";
import sendEmail from "../../utils/sendEmail";
import crypto from "crypto";

const domainURL = process.env.DOMAIN;

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, username, firstName, lastName, password, passwordConfirm } =
    req.body;

  if (!email) {
    res.status(400);
    throw new Error("An email address is required");
  }

  if (!username) {
    res.status(400);
    throw new Error("A username is required");
  }

  if (!firstName || !lastName) {
    res.status(400);
    throw new Error("Full name with first and last name is required");
  }

  if (!password || !passwordConfirm) {
    res.status(400);
    throw new Error("Password and confirmation are required");
  }

  if (password !== passwordConfirm) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("This email is already registered");
  }

  const newUser = new User({
    email,
    username,
    firstName,
    lastName,
    password,
    passwordConfirm,
  });

  const registeredUser = await newUser.save();

  if (!registeredUser) {
    res.status(400);
    throw new Error("User could not be registered");
  }

  const verificationToken = crypto.randomBytes(32).toString("hex");
  console.log(verificationToken);

  const emailVerificationToken = await new VerificationToken({
    _userId: registeredUser._id,
    token: verificationToken,
  }).save();

  const emailLink = `${domainURL}/api/v1/auth/verify/${emailVerificationToken.token}/${registeredUser._id}`;

  const payload = {
    name: registeredUser.firstName,
    link: emailLink,
  };

  console.log("iser registered email", registeredUser.email);
  await sendEmail(
    registeredUser.email,
    "Account Verification",
    payload,
    "./emails/template/accountVerification.handlebars",
  );

  res.json({
    success: true,
    message: `A new user ${registeredUser.firstName} has been registered! A verification email has been sent. Please verify within 15 minutes.`,
  });
});

export default registerUser;
