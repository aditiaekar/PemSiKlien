import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./app/routes";
import AuthProvider from "./app/providers/AuthProvider";
import "./styles/index.css";
import { Toaster } from "react-hot-toast";
import "sweetalert2/dist/sweetalert2.min.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// bikin instance query client (cukup sekali di sini)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 30, // 30 detik
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>

      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{ duration: 2500, style: { fontSize: "14px" } }}
        />
        <AppRoutes />
      </AuthProvider>

    </QueryClientProvider>
  </React.StrictMode>
);
