import { NextRequest, NextResponse } from "next/server";
import { fetchLescoBillRedirect } from "@/lib/server/lescoPitc";

/**
 * This endpoint follows the PITC redirect chain with the verification token.
 * PITC's gbill.aspx does a 302 redirect (Object moved) - this endpoint
 * follows it by POSTing the token so the final page renders the bill.
 */
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

    const result = await fetchLescoBillRedirect(refno, type || "U");

    if (result.success && result.data) {
      return NextResponse.json({ success: true, data: result.data });
    }

    if (result.redirectUrl) {
      return NextResponse.json({
        success: false,
        error: result.error || "PITC redirect loop - please open the bill directly",
        redirectUrl: result.redirectUrl,
      });
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
