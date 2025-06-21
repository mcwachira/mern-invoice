"use client";

import { decodeToken } from "react-jwt";
import { useSelector } from "react-redux";
import {
  selectCurrentUserToken,
  selectCurrentUserGoogleToken,
} from "../features/auth/authSlice";

// Define the expected shape of your decoded token
interface DecodedToken {
  roles: string[];
  [key: string]: any; // to allow other props like exp, iat, etc.
}

const useAuthUser = () => {
  const token = useSelector(selectCurrentUserToken);
  const googleToken = useSelector(selectCurrentUserGoogleToken);

  let isAdmin = false;
  let accessRight: "User" | "Admin" = "User";

  if (token) {
    const decodedToken = decodeToken<DecodedToken>(token);

    if (decodedToken?.roles) {
      const { roles } = decodedToken;
      isAdmin = roles.includes("Admin");
      if (isAdmin) accessRight = "Admin";

      return { roles, isAdmin, accessRight };
    } else if (googleToken) {
      const gDecodedToken = decodeToken(googleToken);
      const { roles } = gDecodedToken;
      isAdmin = roles.includes("Admin");
      if (isAdmin) accessRight = "Admin";

      return { roles: [], isAdmin, accessRight };
    }
  }

  return { roles: [] as string[], isAdmin, accessRight };
};

export default useAuthUser;
