"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { cookieToInitialState, State, WagmiProvider } from "wagmi";
import {
  RainbowKitProvider as NextRainbowKitProvider,
  RainbowKitAuthenticationProvider,
  // RainbowKitAuthenticationProvider,
} from "@rainbow-me/rainbowkit";
import { ReactNode } from "react";

import { useSession } from "next-auth/react";
import { authenticationAdapter } from "@/utils/authenticationAdapter";
import ReactQueryProvider from "./ReactQueryProvider";
import { config } from "@/config";
import { headers } from "next/headers";

type RainbowKitProviderProps = {
  children: ReactNode;
  cookie: string;
};

export default function RainbowKitProvider({
  children,
  cookie,
}: RainbowKitProviderProps) {
  const { status } = useSession();
  const initialState = cookieToInitialState(config, cookie);

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <ReactQueryProvider>
        <RainbowKitAuthenticationProvider
          adapter={authenticationAdapter}
          status={status}
        >
          <NextRainbowKitProvider>
            <div className="h-full min-h-dvh overflow-x-clip font-body text-foreground">
              {children}
            </div>
          </NextRainbowKitProvider>
        </RainbowKitAuthenticationProvider>
      </ReactQueryProvider>
    </WagmiProvider>
  );
}
