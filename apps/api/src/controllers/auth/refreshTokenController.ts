import asyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { HydratedDocument } from "mongoose";

import { CookieOptions, Request, Response } from "express";
import { systemLogs } from "../../utils/logger";
import User from "../../models/userModel";
import { IUser } from "../../types/user";

// $-title   Get new access tokens from the refresh token
// $-path    GET /api/v1/auth/new_access_token
// $-auth    Public
// we are rotating the refresh tokens, deleting the old ones, creating new ones and detecting token reuse

const newAccessToken = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      res.sendStatus(401);
      return;
    }

    const refreshToken = cookies.jwt;

    const options: CookieOptions = {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "none",
    };
    res.clearCookie("jwt", options);

    const existingUser = (await User.findOne({
      refreshToken,
    }).exec()) as HydratedDocument<IUser>;

    if (!existingUser) {
      try {
        const decoded = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET_KEY!,
        ) as JwtPayload;

        const hackedUser = await User.findById(decoded.id).exec();
        if (hackedUser) {
          hackedUser.refreshToken = [];
          await hackedUser.save();
        }
      } catch (err) {
        systemLogs.error(
          "Failed token verification for unknown refresh token.",
        );
      }
      res.sendStatus(403);
      return;
    }

    const newRefreshTokenArray = existingUser.refreshToken.filter(
      (refT) => refT !== refreshToken,
    );

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET_KEY!,
      ) as JwtPayload;
    } catch (err) {
      existingUser.refreshToken = [...newRefreshTokenArray];
      await existingUser.save();
      res.sendStatus(403);
      return;
    }

    if (existingUser._id.toString() !== decoded.id) {
      res.sendStatus(403);
      return;
    }

    const accessToken = jwt.sign(
      {
        id: existingUser._id,
        roles: existingUser.roles,
      },
      process.env.JWT_ACCESS_SECRET_KEY!,
      { expiresIn: "10m" },
    );

    const newRefreshToken = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_REFRESH_SECRET_KEY!,
      { expiresIn: "1d" },
    );

    existingUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    await existingUser.save();

    res.cookie("jwt", newRefreshToken, options);

    res.json({
      success: true,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      username: existingUser.username,
      provider: existingUser.provider,
      avatar: existingUser.avatar,
      accessToken,
    });
  },
);

export default newAccessToken;
