"use server";
import { getServerActionSession } from "@/utils/config/session";

//remove and set serverActions to false in next.config.js to disable server actions

export const submitCookieToStorageServerAction = async (cookie: string) => {
  const session = await getServerActionSession();
  session.nonce = cookie;
  await session.save();
};

export const readCookieFromStorageServerAction = async (): Promise<string> => {
  const session = await getServerActionSession();
  return session.nonce || "No Cookie Stored!";
};
