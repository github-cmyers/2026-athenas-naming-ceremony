import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/adminSession";

export async function GET(request: NextRequest) {
  return NextResponse.json({ authenticated: isAuthenticated(request) });
}
