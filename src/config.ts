"use client";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { cookieStorage, createStorage, http } from "wagmi";
import { polygon } from "viem/chains";
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

export const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: projectId,
  chains: [polygon],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [polygon.id]: http(),
  },
});
