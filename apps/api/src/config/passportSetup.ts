import "dotenv/config";
import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { VerifyCallback } from "passport-google-oauth20";
import User from "../models/userModel";

// Ensure these are defined in your environment
const domainURL = process.env.DOMAIN_URL!;
const googleCallBackURL = process.env.GOOGLE_CALLBACK_URL!;

const googleAuth = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: `${domainURL}/api/v1/${googleCallBackURL}`,
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback,
      ) => {
        try {
          const existingUser = await User.findOne({ googleID: profile.id });

          if (!existingUser) {
            const nameParts = profile.displayName?.split(" ") || [];
            const newUser = await User.create({
              email: profile._json.email,
              username: profile._json.given_name,
              firstName: nameParts[0] || "",
              lastName: nameParts[1] || "",
              avatar: profile._json.picture,
              googleID: profile.id,
              isEmailVerified: profile._json.email_verified,
              provider: "google",
            });

            return done(null, newUser);
          } else {
            return done(null, existingUser);
          }
        } catch (err) {
          return done(err as Error, false);
        }
      },
    ),
  );
};

export default googleAuth;
