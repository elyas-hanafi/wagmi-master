import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { authConfig } from "../../../../../auth";

const handler = NextAuth(authConfig as NextAuthOptions);

export { handler as GET, handler as POST };
