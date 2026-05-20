import { NextRequest, NextResponse } from "next/server";

const PITC_URL = "https://bill.pitc.com.pk/gbill.aspx";
const REQUEST_VERIFICATION_TOKEN =
  "dltUxN3F1zaT6K3bsC0iN_3YmcxJYntiOX1xA7pTZie-xkzRXXyQRijHW94kljqVOtPFEp4lNs8HG19vmaTyZug_zWiz9uonytecveXelzo1";

function extractVerificationToken(html: string) {
  const match = html.match(
    /name="__RequestVerificationToken"[^>]*value="([^"]+)"/i,
  );
  return match ? match[1] : "";
}

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

    // Step 1: GET gbill.aspx to obtain ASP.NET session cookie
    const sessionRes = await fetch(PITC_URL, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "max-age=0",
      },
      redirect: "manual",
    });

    const setCookieHeader = sessionRes.headers.get("set-cookie");
    const aspNetSessionId = setCookieHeader
      ? setCookieHeader.split(";")[0]
      : "";
    const sessionHtml = await sessionRes.text();
    const tokenFromPage = extractVerificationToken(sessionHtml);
    const requestToken = tokenFromPage || REQUEST_VERIFICATION_TOKEN;

    if (!aspNetSessionId) {
      return NextResponse.json(
        { success: false, error: "Failed to establish session with PITC" },
        { status: 502 },
      );
    }

    // Step 2: POST with verification token and reference number
    const postData = new URLSearchParams();
    postData.append("__RequestVerificationToken", requestToken);
    postData.append("refno", refno);
    postData.append("type", type || "U");

    const billRes = await fetch(
      `${PITC_URL}?refno=${encodeURIComponent(refno)}&type=${encodeURIComponent(type || "U")}`,
      {
        method: "POST",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          "Content-Type": "application/x-www-form-urlencoded",
          "Cache-Control": "max-age=0",
          Origin: "https://bill.pitc.com.pk",
          Referer: "https://bill.pitc.com.pk/gbill.aspx",
          Cookie: aspNetSessionId,
        },
        body: postData.toString(),
      },
    );

    const html = await billRes.text();

    if (!billRes.ok || html.length < 500) {
      return NextResponse.json(
        { success: false, error: "Failed to fetch bill from PITC" },
        { status: 502 },
      );
    }

    if (/consumer not found|no record found/i.test(html)) {
      return NextResponse.json(
        { success: false, error: "Consumer not found" },
        { status: 404 },
      );
    }

    // Step 3: Parse the HTML to extract bill data
    const billData = parseBillHtml(html, refno);

    return NextResponse.json({
      success: true,
      data: billData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}

function parseBillHtml(html: string, refno: string) {
  const getText = (regex: RegExp, fallback = "") => {
    const m = html.match(regex);
    return m ? m[1].trim() : fallback;
  };

  const getNumber = (regex: RegExp, fallback = 0) => {
    const v = getText(regex);
    const n = parseFloat(v.replace(/[^0-9.]/g, ""));
    return isNaN(n) ? fallback : n;
  };

  const cleanVal = (v: string) => v.replace(/\r?\n\s*/g, " ").trim();

  // ── Customer Name ──
  const nameMatch = html.match(
    /NAME\s*&?\s*ADDRESS<\/span>\s*<br\s*\/?>\s*<span>([^<]+)<\/span>/i,
  );
  const customerName = nameMatch ? nameMatch[1].trim() : "";

  // ── Address ──
  const addrMatch = html.match(
    /NAME\s*&?\s*ADDRESS<\/span>[\s\S]{0,500}?<span>(PLOT[^<]+|HOUSE[^<]+|FLAT[^<]+|[A-Z]+\s+NO[^<]+)<\/span>/i,
  );
  const address = addrMatch ? addrMatch[1].trim() : "";

  // ── Bill Month, Issue Date, Due Date ──
  // Search for the BILL MONTH header, then grab the next <tr ... class=\"content\">
  const bmIdx = html.indexOf("BILL MONTH");
  const dateSection = html.substring(bmIdx, bmIdx + 2000);
  const dateRowMatch = dateSection.match(
    /<tr[^>]*class="content"[^>]*>([\s\S]*?)<\/tr>/i,
  );
  let billMonth = "";
  let issueDate = "";
  let dueDate = "";
  if (dateRowMatch) {
    const cells = [...dateRowMatch[1].matchAll(/<td[^>]*>\s*([^<]*?)\s*<\/td>/gi)];
    const clean = cells.map((c) => cleanVal(c[1]));
    if (clean.length >= 7) {
      billMonth = clean[3];
      issueDate = clean[5];
      dueDate = clean[6];
    }
  }

  // ── Consumer ID ──
  const consumerIdMatch = html.match(
    /CONSUMER ID<\/h4>[\s\S]{0,500}?content[^>]*>\s*(\d+)/i,
  );
  const consumerId = consumerIdMatch ? consumerIdMatch[1].trim() : "";

  // ── Tariff ──
  const tariffMatch = html.match(
    /<h4>TARIFF<\/h4>[\s\S]{0,500}?content[^>]*>\s*([^<\s][^<]{0,20})</i,
  );
  const tariffCode = tariffMatch ? tariffMatch[1].trim() : "";

  // ── Sanctioned Load ──
  const loadMatch = html.match(
    /<h4>LOAD<\/h4>[\s\S]{0,500}?content[^>]*>\s*(\d+)/i,
  );
  const sanctionedLoad = loadMatch ? loadMatch[1].trim() : "";

  // ── Meter No & Units Consumed ──
  // Search for METER NO header, then find the next content row
  const mnIdx = html.indexOf("METER NO");
  const meterSection = html.substring(mnIdx, mnIdx + 2000);
  const meterRowMatch = meterSection.match(
    /<tr[^>]*class="content"[^>]*>([\s\S]*?)<\/tr>/i,
  );
  let meterNo = "";
  let unitsConsumed = 0;
  if (meterRowMatch) {
    const meterCells = [
      ...meterRowMatch[1].matchAll(/<td[^>]*>\s*([^<]*?)\s*<br/gi),
    ];
    const clean = meterCells.map((c) => cleanVal(c[1]));
    if (clean.length >= 1) meterNo = clean[0];
    if (clean.length >= 5) unitsConsumed = parseInt(clean[4], 10) || 0;
  }

  // ── Total Payable ──
  const totalPayable = getNumber(
    /PAYABLE WITHIN DUE DATE[\s\S]{0,200}?content[^>]*>[\s\S]{0,100}?(\d[\d,]*)/i,
    0,
  );

  // ── Amount After Due ──
  const amountAfterDue = getNumber(
    /PAYABLE AFTER DUE DATE[\s\S]{0,400}?<strong>Till[\s\S]{0,100}?<br\s*\/>\s*(\d[\d,]*)/i,
    0,
  );

  // ── Amount Paid ──
  const amountPaid = getNumber(/Amount Paid:\s*(\d[\d,]*)/i, 0);

  // ── Payment Date ──
  const paymentDate = getText(/Payment Date:\s*([^<]+)/i, "");

  // ── Division / Sub Division ──
  const division = getText(
    /<h4>DIVISION<\/h4>[\s\S]{0,200}?content[^>]*>\s*([^<]+)/i,
    "",
  );
  const subDivision = getText(
    /<h4>SUB DIVISION<\/h4>[\s\S]{0,200}?content[^>]*>\s*([^<]+)/i,
    "",
  );

  // ── Status ──
  let status: "paid" | "unpaid" | "overdue" = "unpaid";
  if (amountPaid > 0 || html.includes("Amount Paid") || html.includes("full_bill_paid")) {
    status = "paid";
  }

  return {
    customerName:
      customerName || `LESCO Consumer ${refno.slice(0, 6)}`,
    address: address || `${division ? division + ", " : ""}${subDivision || ""}`,
    referenceNo: refno,
    consumerId: consumerId || "",
    connectionType: tariffCode ? `${tariffCode} Tariff` : "Residential (LT)",
    billMonth: billMonth || "",
    issueDate: issueDate || "",
    dueDate: dueDate || "",
    lastDate: dueDate || "",
    unitsConsumed,
    billAmount: totalPayable,
    arrears: 0,
    surcharge: 0,
    taxAmount: 0,
    totalPayable,
    previousBalance: 0,
    status,
    meterNo: meterNo || "",
    tariffCode: tariffCode || "",
    sanctionedLoad: sanctionedLoad || "",
    amountAfterDue,
    amountPaid,
    paymentDate: paymentDate || "",
    connectionDate: "",
    division: division || "",
    subDivision: subDivision || "",
  };
}
