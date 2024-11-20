"use client";
import { ReactNode } from "react";
import RainbowKitProvider from "./RainbowKitProvider";
import AuthProvider from "./AuthProvider";
import { Session } from "next-auth";

export default function Providers({
  children,
  cookie,
  session,
}: {
  children: ReactNode;
  cookie: string;
  session: Session;
}) {
  return (
    <AuthProvider session={session}>
      <RainbowKitProvider cookie={cookie}>{children}</RainbowKitProvider>
    </AuthProvider>
  );
}
