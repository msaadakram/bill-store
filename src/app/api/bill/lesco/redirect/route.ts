import { NextRequest, NextResponse } from "next/server";

const TOKEN =
  "dltUxN3F1zaT6K3bsC0iN_3YmcxJYntiOX1xA7pTZie-xkzRXXyQRijHW94kljqVOtPFEp4lNs8HG19vmaTyZug_zWiz9uonytecveXelzo1";

const PITC_BASE = "https://bill.pitc.com.pk";
const PITC_PATH = "/gbill.aspx";

function extractVerificationToken(html: string) {
  const match = html.match(
    /name="__RequestVerificationToken"[^>]*value="([^"]+)"/i,
  );
  return match ? match[1] : "";
}

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

    const url = `${PITC_BASE}${PITC_PATH}?refno=${encodeURIComponent(refno)}&type=${encodeURIComponent(type || "U")}`;

    // Step 1: GET the PITC page to get session cookie + fresh token if needed
    const getRes = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "max-age=0",
      },
      redirect: "manual",
    });

    const cookies = getRes.headers.getSetCookie();
    const sessionCookie = cookies
      .map((c) => c.split(";")[0])
      .join("; ");

    const getHtml = await getRes.text();
    const tokenFromPage = extractVerificationToken(getHtml);
    const requestToken = tokenFromPage || TOKEN;

    const redirectUrl = getRes.headers.get("location");
    const isRedirect = getRes.status === 302;

    // Step 2: POST with the verification token to follow through
    const postData = new URLSearchParams();
    postData.append("__RequestVerificationToken", requestToken);
    postData.append("refno", refno);
    postData.append("type", type || "U");

    const postRes = await fetch(url, {
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: PITC_BASE,
        Referer: url,
        Cookie: sessionCookie,
        "Cache-Control": "max-age=0",
      },
      body: postData.toString(),
      redirect: "manual",
    });

    // If still redirecting, follow one more time with cookie
    if (postRes.status === 302 || postRes.status === 301) {
      const newLocation = postRes.headers.get("location");
      const newCookies = postRes.headers.getSetCookie();
      const allCookies = [...cookies, ...newCookies]
        .map((c) => c.split(";")[0])
        .join("; ");

      const targetUrl = newLocation
        ? newLocation.startsWith("http")
          ? newLocation
          : `${PITC_BASE}${newLocation}`
        : url;

      const finalRes = await fetch(targetUrl, {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          Accept: "text/html,application/xhtml+xml",
          Cookie: allCookies,
          Referer: url,
        },
      });

      const html = await finalRes.text();

      if (html.length > 500) {
        if (/consumer not found|no record found/i.test(html)) {
          return NextResponse.json(
            { success: false, error: "Consumer not found" },
            { status: 404 },
          );
        }
        const billData = parseBillHtml(html, refno);
        return NextResponse.json({ success: true, data: billData });
      }
    }

    const html = await postRes.text();

    if (html.length < 500) {
      // Return the actual redirect URL so the frontend can open it
      return NextResponse.json({
        success: false,
        error: "PITC redirect loop - please open the bill directly",
        redirectUrl: url,
      });
    }

    if (/consumer not found|no record found/i.test(html)) {
      return NextResponse.json(
        { success: false, error: "Consumer not found" },
        { status: 404 },
      );
    }

    const billData = parseBillHtml(html, refno);
    return NextResponse.json({ success: true, data: billData });
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

  // Customer Name
  const nameMatch = html.match(
    /NAME\s*&?\s*ADDRESS<\/span>\s*<br\s*\/?>\s*<span>([^<]+)<\/span>/i,
  );
  const customerName = nameMatch ? nameMatch[1].trim() : `LESCO Consumer ${refno.slice(0, 6)}`;

  // Address
  const addrMatch = html.match(
    /NAME\s*&?\s*ADDRESS<\/span>[\s\S]{0,500}?<span>(PLOT[^<]+|HOUSE[^<]+|FLAT[^<]+|[A-Z]+\s+NO[^<]+)<\/span>/i,
  );
  const address = addrMatch ? addrMatch[1].trim() : "";

  // Content row for dates
  const contentRowMatch = html.match(
    /BILL MONTH<\/h4>[\s\S]{0,1000}?<tr[^>]*class="content"[^>]*>([\s\S]{0,500}?)<\/tr>/i,
  );
  let billMonth = "";
  let dueDate = "";
  let issueDate = "";
  if (contentRowMatch) {
    const cells = [...contentRowMatch[1].matchAll(/<td[^>]*>([^<]*)<\/td>/gi)];
    if (cells.length >= 7) {
      billMonth = cells[3][1].trim();
      issueDate = cells[5][1].trim();
      dueDate = cells[6][1].trim();
    }
  }

  // Consumer ID
  const consumerIdMatch = html.match(/CONSUMER ID<\/h4>[\s\S]{0,500}?content[^>]*>\s*(\d+)/i);
  const consumerId = consumerIdMatch ? consumerIdMatch[1].trim() : "";

  // Tariff
  const tariffMatch = html.match(/<h4>TARIFF<\/h4>[\s\S]{0,500}?content[^>]*>\s*([^<\s][^<]{0,20})</i);
  const tariffCode = tariffMatch ? tariffMatch[1].trim() : "";

  // Meter No
  const meterRowMatch = html.match(
    /METER NO<\/h4>[\s\S]{0,1200}?<tr[^>]*class="content"[^>]*>([\s\S]{0,800}?)<\/tr>/i,
  );
  let meterNo = "";
  let unitsConsumed = 0;
  if (meterRowMatch) {
    const meterCells = [...meterRowMatch[1].matchAll(/<td[^>]*>([^<]*)<br/gi)];
    if (meterCells.length >= 1) meterNo = meterCells[0][1].replace(/\s+/g, " ").trim();
    if (meterCells.length >= 5) unitsConsumed = parseInt(meterCells[4][1].trim(), 10) || 0;
  }

  // Total Payable
  const totalPayable = getNumber(
    /PAYABLE WITHIN DUE DATE[\s\S]{0,200}?content[^>]*>[\s\S]{0,100}?(\d[\d,]*)/i,
    0,
  );

  // Amount After Due
  const amountAfterDue = getNumber(
    /PAYABLE AFTER DUE DATE[\s\S]{0,400}?<strong>Till[\s\S]{0,100}?<br\s*\/>\s*(\d[\d,]*)/i,
    0,
  );

  const amountPaid = getNumber(/Amount Paid:\s*(\d[\d,]*)/i, 0);
  const paymentDate = getText(/Payment Date:\s*([^<]+)/i, "");

  let status: "paid" | "unpaid" | "overdue" = "unpaid";
  if (amountPaid > 0 || html.includes("Amount Paid") || html.includes("full_bill_paid")) {
    status = "paid";
  }

  return {
    customerName,
    address: address || "",
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
    sanctionedLoad: "",
    amountAfterDue,
    amountPaid,
    paymentDate: paymentDate || "",
    connectionDate: "",
    division: "",
    subDivision: "",
  };
}
