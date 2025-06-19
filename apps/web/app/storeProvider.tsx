"use client";
import { useRef } from "react";
import { Provider } from "react-redux";

import { ThemeProvider } from "@/components/ThemeProvider";
import { AppStore, makeStore } from "@/lib/redux/store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <ThemeProvider defaultTheme="dark" storageKey="invoice-theme">
        {children}
      </ThemeProvider>
    </Provider>
  );
}
