"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSession } from "next-auth/react";
import React from "react";
import { submitCookieToStorageRouteHandler } from "./clientAction";

export default function page() {
  const session = useSession();
  const readCookieFromStorageRouteHandler = async (): Promise<string> => {
    const responseWithCookieFromStorage = await fetch(
      "http://localhost:3000/api/readIronSessionCookie",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await responseWithCookieFromStorage.json();
    const cookieValue = data?.cookieInStorage || "No Cookie In Storage";
    return cookieValue;
  };
  return (
    <>
      <ConnectButton />

      <div>
        <p>{session.data?.accessToken}</p>
        <p>{session.data?.user.walletAddress}</p>
      </div>
      <button onClick={readCookieFromStorageRouteHandler}>G</button>
    </>
  );
}
