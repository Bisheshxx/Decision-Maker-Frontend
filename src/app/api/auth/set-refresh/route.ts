import { NextRequest, NextResponse } from "next/server";

type RefreshTokenBody = {
  refreshToken: string;
};

export async function POST(req: NextRequest) {
  const { refreshToken } = (await req.json()) as RefreshTokenBody;

  const response = NextResponse.json({ success: true });

  response.cookies.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
