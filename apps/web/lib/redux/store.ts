import { baseApiSlice } from "@/features/api/baseApiSlice";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [baseApiSlice.reducerPath]: baseApiSlice.reducer,
      auth: authReducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApiSlice.middleware),

    //remove in production
    devTools: true,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
