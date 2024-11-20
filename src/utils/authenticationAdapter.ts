import { createAuthenticationAdapter } from "@rainbow-me/rainbowkit";
import { createSiweMessage } from "viem/siwe";
import { signIn, signOut } from "next-auth/react";

export const authenticationAdapter = createAuthenticationAdapter({
  getNonce: async () => {
    const verifyRes = await fetch("/api/nonce", {
      method: "POST", // Changed to POST
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}), // Include an empty body or any required data
    });

    if (!verifyRes.ok) {
      throw new Error("Failed to fetch nonce");
    }

    const data = await verifyRes.json(); // Convert response to JSON
    return data.nonce; // Return the fetched nonce
  },

  createMessage: ({ nonce, address, chainId }) => {
    return createSiweMessage({
      domain: window.location.host,
      address,
      statement: "Sign in with Ethereum to the app.",
      uri: window.location.origin,
      version: "1",
      chainId,
      nonce,
    });
  },
  verify: async ({ message, signature }) => {
    const loginData = { message, signature };
    const verifyRes = await signIn("credentials", {
      redirect: false,
      ...loginData,
    });
    return Boolean(verifyRes?.ok);
  },
  signOut: async () => {
    await signOut();
  },
});
