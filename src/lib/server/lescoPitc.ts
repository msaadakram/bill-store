const PITC_URL = "https://bill.pitc.com.pk/gbill.aspx";
const PITC_BASE = "https://bill.pitc.com.pk";
const PITC_PATH = "/gbill.aspx";
const REQUEST_VERIFICATION_TOKEN =
  "dltUxN3F1zaT6K3bsC0iN_3YmcxJYntiOX1xA7pTZie-xkzRXXyQRijHW94kljqVOtPFEp4lNs8HG19vmaTyZug_zWiz9uonytecveXelzo1";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

export interface BillData {
  customerName: string;
  address: string;
  referenceNo: string;
  consumerId: string;
  connectionType: string;
  billMonth: string;
  issueDate: string;
  dueDate: string;
  lastDate: string;
  unitsConsumed: number;
  billAmount: number;
  arrears: number;
  surcharge: number;
  taxAmount: number;
  totalPayable: number;
  previousBalance: number;
  status: "paid" | "unpaid" | "overdue";
  meterNo: string;
  tariffCode: string;
  sanctionedLoad: string;
  amountAfterDue: number;
  amountPaid: number;
  paymentDate: string;
  connectionDate: string;
  division: string;
  subDivision: string;
}

export interface ApiResponse {
  success: boolean;
  data?: BillData;
  error?: string;
  redirectUrl?: string;
}

function extractVerificationToken(html: string) {
  const match = html.match(
    /name="__RequestVerificationToken"[^>]*value="([^"]+)"/i,
  );
  return match ? match[1] : "";
}

function getSetCookieArray(headers: Headers) {
  const hdrs = headers as Headers & { getSetCookie?: () => string[] };
  if (typeof hdrs.getSetCookie === "function") {
    return hdrs.getSetCookie();
  }
  const raw = headers.get("set-cookie");
  return raw ? [raw] : [];
}

export async function fetchLescoBill(refno: string, type = "U"): Promise<ApiResponse> {
  try {
    if (!refno) {
      return { success: false, error: "Reference number is required" };
    }

    const sessionRes = await fetch(PITC_URL, {
      method: "GET",
      headers: {
        "User-Agent": USER_AGENT,
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "max-age=0",
      },
      redirect: "manual",
      cache: "no-store",
    });

    const setCookieHeader = sessionRes.headers.get("set-cookie");
    const aspNetSessionId = setCookieHeader
      ? setCookieHeader.split(";")[0]
      : "";
    const sessionHtml = await sessionRes.text();
    const tokenFromPage = extractVerificationToken(sessionHtml);
    const requestToken = tokenFromPage || REQUEST_VERIFICATION_TOKEN;

    if (!aspNetSessionId) {
      return { success: false, error: "Failed to establish session with PITC" };
    }

    const postData = new URLSearchParams();
    postData.append("__RequestVerificationToken", requestToken);
    postData.append("refno", refno);
    postData.append("type", type || "U");

    const billRes = await fetch(
      `${PITC_URL}?refno=${encodeURIComponent(refno)}&type=${encodeURIComponent(type || "U")}`,
      {
        method: "POST",
        headers: {
          "User-Agent": USER_AGENT,
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          "Content-Type": "application/x-www-form-urlencoded",
          "Cache-Control": "max-age=0",
          Origin: PITC_BASE,
          Referer: PITC_URL,
          Cookie: aspNetSessionId,
        },
        body: postData.toString(),
        cache: "no-store",
      },
    );

    const html = await billRes.text();

    if (!billRes.ok || html.length < 500) {
      return { success: false, error: "Failed to fetch bill from PITC" };
    }

    if (/consumer not found|no record found/i.test(html)) {
      return { success: false, error: "Consumer not found" };
    }

    return {
      success: true,
      data: parseBillHtml(html, refno),
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Internal server error",
    };
  }
}

export async function fetchLescoBillRedirect(
  refno: string,
  type = "U",
): Promise<ApiResponse> {
  try {
    if (!refno) {
      return { success: false, error: "Reference number is required" };
    }

    const url = `${PITC_BASE}${PITC_PATH}?refno=${encodeURIComponent(refno)}&type=${encodeURIComponent(type || "U")}`;

    const getRes = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "max-age=0",
      },
      redirect: "manual",
      cache: "no-store",
    });

    const cookies = getSetCookieArray(getRes.headers);
    const sessionCookie = cookies
      .map((c) => c.split(";")[0])
      .join("; ");

    const getHtml = await getRes.text();
    const tokenFromPage = extractVerificationToken(getHtml);
    const requestToken = tokenFromPage || REQUEST_VERIFICATION_TOKEN;

    const postData = new URLSearchParams();
    postData.append("__RequestVerificationToken", requestToken);
    postData.append("refno", refno);
    postData.append("type", type || "U");

    const postRes = await fetch(url, {
      method: "POST",
      headers: {
        "User-Agent": USER_AGENT,
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
      cache: "no-store",
    });

    if (postRes.status === 302 || postRes.status === 301) {
      const newLocation = postRes.headers.get("location");
      const newCookies = getSetCookieArray(postRes.headers);
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
          "User-Agent": USER_AGENT,
          Accept: "text/html,application/xhtml+xml",
          Cookie: allCookies,
          Referer: url,
        },
        cache: "no-store",
      });

      const html = await finalRes.text();

      if (html.length > 500) {
        if (/consumer not found|no record found/i.test(html)) {
          return { success: false, error: "Consumer not found" };
        }
        return { success: true, data: parseBillHtml(html, refno) };
      }
    }

    const html = await postRes.text();

    if (html.length < 500) {
      return {
        success: false,
        error: "PITC redirect loop - please open the bill directly",
        redirectUrl: url,
      };
    }

    if (/consumer not found|no record found/i.test(html)) {
      return { success: false, error: "Consumer not found" };
    }

    return { success: true, data: parseBillHtml(html, refno) };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Internal server error",
    };
  }
}

function parseBillHtml(html: string, refno: string): BillData {
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

  const nameMatch = html.match(
    /NAME\s*&?\s*ADDRESS<\/span>\s*<br\s*\/?>\s*<span>([^<]+)<\/span>/i,
  );
  const customerName = nameMatch ? nameMatch[1].trim() : "";

  const addrMatch = html.match(
    /NAME\s*&?\s*ADDRESS<\/span>[\s\S]{0,500}?<span>(PLOT[^<]+|HOUSE[^<]+|FLAT[^<]+|[A-Z]+\s+NO[^<]+)<\/span>/i,
  );
  const address = addrMatch ? addrMatch[1].trim() : "";

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

  const consumerIdMatch = html.match(
    /CONSUMER ID<\/h4>[\s\S]{0,500}?content[^>]*>\s*(\d+)/i,
  );
  const consumerId = consumerIdMatch ? consumerIdMatch[1].trim() : "";

  const tariffMatch = html.match(
    /<h4>TARIFF<\/h4>[\s\S]{0,500}?content[^>]*>\s*([^<\s][^<]{0,20})</i,
  );
  const tariffCode = tariffMatch ? tariffMatch[1].trim() : "";

  const loadMatch = html.match(
    /<h4>LOAD<\/h4>[\s\S]{0,500}?content[^>]*>\s*(\d+)/i,
  );
  const sanctionedLoad = loadMatch ? loadMatch[1].trim() : "";

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

  const totalPayable = getNumber(
    /PAYABLE WITHIN DUE DATE[\s\S]{0,200}?content[^>]*>[\s\S]{0,100}?(\d[\d,]*)/i,
    0,
  );

  const amountAfterDue = getNumber(
    /PAYABLE AFTER DUE DATE[\s\S]{0,400}?<strong>Till[\s\S]{0,100}?<br\s*\/>\s*(\d[\d,]*)/i,
    0,
  );

  const amountPaid = getNumber(/Amount Paid:\s*(\d[\d,]*)/i, 0);
  const paymentDate = getText(/Payment Date:\s*([^<]+)/i, "");

  const division = getText(
    /<h4>DIVISION<\/h4>[\s\S]{0,200}?content[^>]*>\s*([^<]+)/i,
    "",
  );
  const subDivision = getText(
    /<h4>SUB DIVISION<\/h4>[\s\S]{0,200}?content[^>]*>\s*([^<]+)/i,
    "",
  );

  let status: "paid" | "unpaid" | "overdue" = "unpaid";
  if (amountPaid > 0 || html.includes("Amount Paid") || html.includes("full_bill_paid")) {
    status = "paid";
  }

  return {
    customerName: customerName || `LESCO Consumer ${refno.slice(0, 6)}`,
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
