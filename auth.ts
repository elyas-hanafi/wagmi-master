import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { SiweMessage } from "siwe";
import { readCookieFromStorageServerAction } from "@/app/serverActions";

interface User {
  id: string;
  accessToken: string;
  walletAddress: string;
}

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        message: { label: "message", type: "string" },
        signature: { label: "signature", type: "string" },
      },
      authorize: async (
        credentials: Record<"message" | "signature", string> | undefined
      ): Promise<User | null> => {
        // Handle case where credentials might be undefined
        if (!credentials) {
          console.error("No credentials provided.");
          return null;
        }

        try {
          const siweMessage = new SiweMessage(credentials.message);
          const nonce = await readCookieFromStorageServerAction();

          // Check if the nonce matches
          if (nonce !== siweMessage.nonce) {
            throw new Error("Invalid nonce: Nonce mismatch detected.");
          }

          // Verify the signature
          const verificationResult = await siweMessage.verify({
            signature: credentials.signature,
            domain: siweMessage.domain,
            nonce: siweMessage.nonce,
          });

          if (verificationResult) {
            const user: User = {
              id: verificationResult.data.address,
              accessToken: "Ox1010", // Example token, replace with actual logic
              walletAddress: verificationResult.data.address,
            };
            return user; // Return the user object
          }

          // Return null if verification fails
          return null;
        } catch (error) {
          if (error instanceof Error) {
            // Handle Error object
            console.error("Login error:", error.message);
            throw new Error(error.message);
          } else {
            // Handle other types of errors (e.g., string)
            console.error("Login error:", error);
            throw new Error("An unknown error occurred.");
          }
        }
      },
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token, user, session }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.walletAddress = user.walletAddress;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.walletAddress = token.walletAddress;
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
  },
  events: {
    async signIn(message) {
      /* on successful sign in */
    },
    async signOut(message) {
      /* on signout */
    },
    async createUser(message) {
      /* user created */
    },
    async updateUser(message) {
      /* user updated - e.g. their email was verified */
    },
    async linkAccount(message) {
      /* account (e.g. Twitter) linked to a user */
    },
    async session(message) {
      /* session is active */
    },
  },
};

declare module "next-auth" {
  interface User {
    accessToken: string;
    walletAddress: string;
  }
}

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      walletAddress: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    walletAddress: string;
  }
}
