import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../../models/userModel";
import VerificationToken from "../../models/verifyResetTokenModel";
import sendEmail from "../../utils/sendEmail";
import crypto from "crypto";
import { HydratedDocument } from "mongoose";
import { IUser } from "../../types/user";

const domainURL = process.env.DOMAIN;

// $-title   Resend Email VerificationToken
// $-path    POST /api/v1/auth/resend_email_token
// $-auth    Public

const resendEmailVerification = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = (await User.findOne({ email })) as HydratedDocument<IUser>;

    if (!email) {
      res.status(400);
      throw new Error("Email does not exist");
    }

    if (!user) {
      res.status(400);
      throw new Error("We are unable to find a user with that email adress ");
    }

    if (user.isEmailVerified) {
      throw new Error("This account has already been verified .Please log in");
    }

    let verififcationToken = await VerificationToken.findOne({
      _userId: user._id,
    });

    if (verififcationToken) {
      await VerificationToken.deleteOne();
    }

    const resentToken = crypto.randomBytes(32).toString("hex");
    console.log("resent", resentToken);

    let emailToken = await new VerificationToken({
      _userId: user._id,
      token: resentToken,
    }).save();

    console.log("emai token", emailToken);
    const emailLink = `${domainURL}/api/v1/auth/verify/${emailToken.token}/${user._id}`;

    const payload = {
      name: user.firstName,
      link: emailLink,
    };

    await sendEmail(
      user.email,
      "Account Verification",
      payload,
      "./emails/template/accountVerification.handlebars",
    );

    res.json({
      success: true,
      message: `${user.firstName}, an email has been send to your account , please verify within 15 minutes`,
    });
  },
);

export default resendEmailVerification;
