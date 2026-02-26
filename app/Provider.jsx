"use client"
import { SessionProvider } from "next-auth/react";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const Provider = ({ children }) => {
  return (
    <SessionProvider>
      {children}
      <Toaster position="top-center" reverseOrder={false} />
    </SessionProvider>
  );
};

export default Provider;
