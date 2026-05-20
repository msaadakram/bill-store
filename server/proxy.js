const express = require("express");

const PITC_URL = "https://bill.pitc.com.pk/gbill.aspx";
const REQUEST_VERIFICATION_TOKEN =
  "dltUxN3F1zaT6K3bsC0iN_3YmcxJYntiOX1xA7pTZie-xkzRXXyQRijHW94kljqVOtPFEp4lNs8HG19vmaTyZug_zWiz9uonytecveXelzo1";
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const app = express();
app.use(express.json({ limit: "1mb" }));

function extractVerificationToken(html) {
  const match = html.match(
    /name="__RequestVerificationToken"[^>]*value="([^"]+)"/i,
  );
  return match ? match[1] : "";
}

async function fetchPitcHtml(refno, type) {
  try {
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
    });

    const setCookieHeader = sessionRes.headers.get("set-cookie");
    const aspNetSessionId = setCookieHeader
      ? setCookieHeader.split(";")[0]
      : "";
    const sessionHtml = await sessionRes.text();
    const tokenFromPage = extractVerificationToken(sessionHtml);
    const requestToken = tokenFromPage || REQUEST_VERIFICATION_TOKEN;

    if (!aspNetSessionId) {
      return {
        ok: false,
        status: 502,
        error: "Failed to establish session with PITC",
      };
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
          Origin: "https://bill.pitc.com.pk",
          Referer: "https://bill.pitc.com.pk/gbill.aspx",
          Cookie: aspNetSessionId,
        },
        body: postData.toString(),
      },
    );

    const html = await billRes.text();

    if (!billRes.ok || html.length < 500) {
      return {
        ok: false,
        status: 502,
        error: "Failed to fetch bill from PITC",
      };
    }

    if (/consumer not found|no record found/i.test(html)) {
      return { ok: false, status: 404, error: "Consumer not found" };
    }

    return { ok: true, html };
  } catch (error) {
    return {
      ok: false,
      status: 502,
      error: error?.message || "Fetch failed",
    };
  }
}

async function handleRequest(req, res) {
  const refno = (req.body && req.body.refno) || req.query.refno;
  const type = (req.body && req.body.type) || req.query.type || "U";

  if (!refno) {
    res.status(400).json({ error: "Reference number is required" });
    return;
  }

  const result = await fetchPitcHtml(refno, type);
  if (!result.ok) {
    res.status(result.status || 502).json({ error: result.error });
    return;
  }

  res.set("Content-Type", "text/html; charset=utf-8").status(200).send(result.html);
}

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/proxy/lesco", handleRequest);
app.get("/proxy/lesco", handleRequest);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`PITC proxy listening on :${PORT}`);
});
