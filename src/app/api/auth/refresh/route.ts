import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ApiResponse } from "@/shared/types/global.types";
import { LoginResponse } from "@/features/auth/types/user.types";

export async function POST(): Promise<NextResponse> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  console.log(refreshToken, "machikne");

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/refresh`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    },
  );

  const payload = (await res.json()) as ApiResponse<LoginResponse>;
  console.log("[[[[[[[[[[[[[[[[PAYLOAD]]]]]]]]]]]]]]]]");
  console.log("[PAYLOAD]: ", payload, refreshToken);
  console.log("[[[[[[[[[[[[[[[[PAYLOAD]]]]]]]]]]]]]]]]");

  if (!payload.success) {
    const response = NextResponse.json(
      {
        error: payload.message || "Refresh failed",
        upstreamStatus: res.status,
        upstream: payload,
      },
      { status: res.status },
    );
    response.headers.set("x-refresh-debug", "failed");
    response.cookies.delete("refresh_token");
    return response;
  }

  const accessToken = payload.data?.token;
  const newRefreshToken = payload.data?.refreshToken;

  if (!accessToken || !newRefreshToken) {
    const response = NextResponse.json(
      { error: "Invalid refresh response payload" },
      { status: 401 },
    );
    response.cookies.delete("refresh_token");
    return response;
  }

  const response = NextResponse.json({ accessToken });

  response.cookies.set("refresh_token", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  console.log("______________________________________________________");

  return response;
}
