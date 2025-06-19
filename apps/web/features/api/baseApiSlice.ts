import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/lib/redux/store";
import { logIn, logOut } from "../auth/authSlice";
import { LoginResponse } from "../auth/types";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.user?.accessToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let response = await baseQuery(args, api, extraOptions);

  if (response?.error?.status === 403) {
    const refreshResponse = await baseQuery(
      "/auth/new_access_token",
      api,
      extraOptions,
    );

    if (refreshResponse?.data) {
      // Cast to LoginResponse to satisfy TS if needed
      api.dispatch(logIn(refreshResponse.data as LoginResponse));
      response = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return response;
};

export const baseApiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["User", "Customer", "Document"],
  endpoints: (builder) => ({}),
});
