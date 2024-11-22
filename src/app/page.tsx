"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSession } from "next-auth/react";
import React from "react";

export default function page() {
  const session = useSession();

  return (
    <>
      <ConnectButton />

      <div>
        <p>{session.data?.accessToken}</p>
        <p>{session.data?.user.walletAddress}</p>
      </div>
    </>
  );
}
