// features/auth/authApiSlice.ts
import { baseApiSlice } from "../api/baseApiSlice";
import type { RegisterRequest, RegisterResponse } from "./types"; // define these types

export const authApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = authApiSlice;
