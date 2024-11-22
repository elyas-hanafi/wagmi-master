import { submitCookieToStorageServerAction } from "@/utils/action/serverActions";
import { NextResponse } from "next/server";
import { generateNonce } from "siwe";

export async function POST() {
  try {
    const nonce = generateNonce();
    await submitCookieToStorageServerAction(nonce);
    return NextResponse.json({ nonce: nonce }, { status: 201 }); // 201 Created
  } catch (error: unknown) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
