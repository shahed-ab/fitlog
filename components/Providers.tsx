"use client";

import React from "react";
import { PlanProvider } from "@/context/PlanContext";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PlanProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#161922",
            color: "#f5f5f5",
            border: "1px solid #232732",
            borderRadius: "10px",
            boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.6)",
          },
        }}
      />
    </PlanProvider>
  );
}
