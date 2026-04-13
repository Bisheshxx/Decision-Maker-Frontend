import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(): Promise<NextResponse> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (refreshToken) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/accounts/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.delete("refresh_token");

  return response;
}
