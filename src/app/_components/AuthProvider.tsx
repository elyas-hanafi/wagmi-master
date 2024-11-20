"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

export default function AuthProvider({
  children,
  session,
}: {
  children: ReactNode;
  session: Session;
}) {
  return (
    <SessionProvider baseUrl={process.env.NEXTAUTH_URL} session={session}>
      {children}
    </SessionProvider>
  );
}
