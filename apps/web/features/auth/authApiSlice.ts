// features/auth/authApiSlice.ts
import { baseApiSlice } from "../api/baseApiSlice";
import { logOut } from "./authSlice";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "./types"; // define these types

export const authApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    logOutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut());
          dispatch(baseApiSlice.util.resetApiState());
        } catch (err) {
          console.error("Logout failed:", err);
        }
      },
    }),

    resendVerifyEmail: builder.mutation({
      query: (userEmail) => ({
        url: "/auth/resend_email_token",
        method: "POST",
        body: userEmail,
      }),
    }),

    passwordResetRequest: builder.mutation({
      query: (formData) => ({
        url: "/auth/reset_password_request",
        method: "POST",
        body: formData,
      }),
    }),
    resetPassword: builder.mutation({
      query: (formData) => ({
        url: "/auth/reset_password",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

//useRegisterUserMutation this is because its a mutation
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogOutUserMutation,
  useResendVerifyEmailMutation,
  usePasswordResetRequestMutation,
  useResetPasswordMutation,
} = authApiSlice;
