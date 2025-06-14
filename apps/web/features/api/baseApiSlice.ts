import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/lib/redux/store";

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

export const baseApiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({}),
});
