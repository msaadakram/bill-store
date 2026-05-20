import { NextRequest, NextResponse } from "next/server";
import { fetchLescoBill } from "@/lib/server/lescoPitc";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { refno, type } = body;

    if (!refno) {
      return NextResponse.json(
        { success: false, error: "Reference number is required" },
        { status: 400 },
      );
    }

    const result = await fetchLescoBill(refno, type || "U");

    if (result.success && result.data) {
      return NextResponse.json({ success: true, data: result.data });
    }

    const status =
      result.error === "Reference number is required"
        ? 400
        : result.error === "Consumer not found"
        ? 404
        : 502;

    return NextResponse.json(
      { success: false, error: result.error || "Failed to fetch bill from PITC" },
      { status },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
