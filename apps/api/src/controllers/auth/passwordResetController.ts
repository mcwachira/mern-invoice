import asyncHandler from "express-async-handler";
import User from "../../models/userModel";
import sendEmail from "../../utils/sendEmail";
import VerificationToken from "../../models/verifyResetTokenModel";
import crypto from "crypto";

// $-title   Send password reset email link
// $-path    POST /api/v1/auth/reset_password_request
// $-auth    Public

const domainURL = process.env.DOMAIN_URL;
console.log(domainURL);

const resetPasswordRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("You must enter your email address");
  }

  const existingUser = await User.findOne({ email }).select("-passwordConfirm");

  if (!existingUser) {
    res.status(400);
    throw new Error("That email is not associated with any account");
  }

  let verificationToken = await VerificationToken.findOne({
    _userId: existingUser._id,
  });

  console.log("verificationtoken based on id", verificationToken);
  if (verificationToken) {
    await verificationToken.deleteOne();
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  console.log(resetToken);

  let newVerificationToken = await new VerificationToken({
    _userId: existingUser._id,
    token: resetToken,
    createdAt: Date.now(),
  }).save();

  console.log("new verificationtoken based on id", newVerificationToken);

  if (existingUser && existingUser.isEmailVerified) {
    const emailLink = `${domainURL}/auth/reset_password?emailToken=${newVerificationToken.token}&userId=${existingUser._id}`;

    console.log("email link", emailLink);

    const payload = {
      name: existingUser.firstName,
      link: emailLink,
    };

    await sendEmail(
      existingUser.email,
      "Password Reset Request",
      payload,
      "./emails/template/requestResetPassword.handlebars",
    );

    res.status(200).json({
      success: true,
      message: `Hey ${existingUser.firstName}, an email has been sent to your account with the password reset link`,
    });
  }
});

// $-title   Reset User Password
// $-path    POST /api/v1/auth/reset_password
// $-auth    Public

const resetPassword = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { password, passwordConfirm, userId, emailToken } = req.body;

  console.log("userid", userId);
  if (!password) {
    res.status(400);
    throw new Error("A password is required");
  }
  if (!passwordConfirm) {
    res.status(400);
    throw new Error("A confirm password field is required");
  }

  if (password !== passwordConfirm) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  if (password.length < 8) {
    res.status(400);
    throw new Error("Passwords must be at least 8 characters long");
  }

  const passwordResetToken = await VerificationToken.findOne({
    _userId: userId,
  });
  console.log(passwordResetToken);

  if (!passwordResetToken) {
    res.status(400);
    throw new Error(
      "Your token is either invalid or expired. Try resetting your password again",
    );
  }

  const user = await User.findById({
    _id: passwordResetToken._userId,
  }).select("-passwordConfirm");

  if (user && passwordResetToken) {
    user.password = password;
    await user.save();

    const payload = {
      name: user.firstName,
    };

    await sendEmail(
      user.email,
      "Password Reset Success",
      payload,
      "./emails/template/resetPassword.handlebars",
    );

    res.json({
      success: true,
      message: `Hey ${user.firstName},Your password reset was successful. An email has been sent to confirm the same`,
    });
  }
});

export { resetPasswordRequest, resetPassword };
