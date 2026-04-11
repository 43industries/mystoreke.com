import { Buffer } from "node:buffer";

export type MpesaEnv = "sandbox" | "production";

function baseUrl(env: MpesaEnv): string {
  return env === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";
}

export function getMpesaConfig(): {
  env: MpesaEnv;
  consumerKey: string;
  consumerSecret: string;
  shortCode: string;
  passkey: string;
  callbackUrl: string;
  transactionType: "CustomerPayBillOnline" | "CustomerBuyGoodsOnline";
} | null {
  const consumerKey = process.env.MPESA_CONSUMER_KEY ?? "";
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET ?? "";
  const shortCode = process.env.MPESA_SHORTCODE ?? "";
  const passkey = process.env.MPESA_PASSKEY ?? "";
  const callbackUrl = process.env.MPESA_CALLBACK_URL ?? "";
  const env =
    process.env.MPESA_ENV === "production" ? "production" : "sandbox";
  const tx = process.env.MPESA_TRANSACTION_TYPE;
  const transactionType =
    tx === "CustomerBuyGoodsOnline"
      ? "CustomerBuyGoodsOnline"
      : "CustomerPayBillOnline";

  if (
    !consumerKey ||
    !consumerSecret ||
    !shortCode ||
    !passkey ||
    !callbackUrl
  ) {
    return null;
  }

  return {
    env,
    consumerKey,
    consumerSecret,
    shortCode,
    passkey,
    callbackUrl,
    transactionType,
  };
}

function stkPassword(shortCode: string, passkey: string, timestamp: string): string {
  const raw = `${shortCode}${passkey}${timestamp}`;
  return Buffer.from(raw).toString("base64");
}

function timestampDaraja(): string {
  const d = new Date();
  const pad = (n: number, w = 2) => String(n).padStart(w, "0");
  return (
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}` +
    `${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`
  );
}

let tokenCache: { token: string; expiresAt: number } | null = null;

export async function getDarajaAccessToken(config: NonNullable<
  ReturnType<typeof getMpesaConfig>
>): Promise<string> {
  const now = Date.now();
  if (tokenCache && tokenCache.expiresAt > now + 60_000) {
    return tokenCache.token;
  }

  const auth = Buffer.from(
    `${config.consumerKey}:${config.consumerSecret}`,
  ).toString("base64");

  const res = await fetch(
    `${baseUrl(config.env)}/oauth/v1/generate?grant_type=client_credentials`,
    {
      headers: { Authorization: `Basic ${auth}` },
    },
  );

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Daraja OAuth failed: ${res.status} ${t}`);
  }

  const data = (await res.json()) as {
    access_token: string;
    expires_in: string;
  };
  const expiresInSec = Number.parseInt(data.expires_in ?? "3600", 10);
  tokenCache = {
    token: data.access_token,
    expiresAt: now + expiresInSec * 1000,
  };
  return data.access_token;
}

export type StkPushParams = {
  amountKes: number;
  phone254: string;
  accountReference: string;
  transactionDesc: string;
};

export type StkPushResult =
  | {
      ok: true;
      merchantRequestId: string;
      checkoutRequestId: string;
      customerMessage: string;
      responseDescription: string;
    }
  | { ok: false; error: string; responseCode?: string };

export async function initiateStkPush(
  config: NonNullable<ReturnType<typeof getMpesaConfig>>,
  params: StkPushParams,
): Promise<StkPushResult> {
  const amount = Math.round(params.amountKes);
  if (amount < 1) {
    return { ok: false, error: "Amount must be at least 1 KES" };
  }

  const timestamp = timestampDaraja();
  const password = stkPassword(config.shortCode, config.passkey, timestamp);
  const token = await getDarajaAccessToken(config);

  const phone = Number(params.phone254);
  const shortCodeNum = Number(config.shortCode);

  const body = {
    BusinessShortCode: shortCodeNum,
    Password: password,
    Timestamp: timestamp,
    TransactionType: config.transactionType,
    Amount: amount,
    PartyA: phone,
    PartyB: shortCodeNum,
    PhoneNumber: phone,
    CallBackURL: config.callbackUrl,
    AccountReference: params.accountReference.slice(0, 12),
    TransactionDesc: params.transactionDesc.slice(0, 13),
  };

  const res = await fetch(
    `${baseUrl(config.env)}/mpesa/stkpush/v1/processrequest`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  const json = (await res.json()) as {
    MerchantRequestID?: string;
    CheckoutRequestID?: string;
    ResponseCode?: string | number;
    ResponseDescription?: string;
    CustomerMessage?: string;
    errorMessage?: string;
    requestId?: string;
  };

  if (!res.ok) {
    return {
      ok: false,
      error: json.errorMessage ?? json.ResponseDescription ?? `HTTP ${res.status}`,
      responseCode:
        json.ResponseCode == null ? undefined : String(json.ResponseCode),
    };
  }

  const codeOk =
    json.ResponseCode === "0" ||
    json.ResponseCode === 0 ||
    String(json.ResponseCode) === "0";
  if (!codeOk) {
    return {
      ok: false,
      error:
        json.ResponseDescription ??
        json.errorMessage ??
        "STK Push request rejected",
      responseCode: String(json.ResponseCode),
    };
  }

  const merchantRequestId = json.MerchantRequestID ?? "";
  const checkoutRequestId = json.CheckoutRequestID ?? "";
  if (!merchantRequestId || !checkoutRequestId) {
    return { ok: false, error: "Missing request IDs from Daraja" };
  }

  return {
    ok: true,
    merchantRequestId,
    checkoutRequestId,
    customerMessage: json.CustomerMessage ?? "Check your phone.",
    responseDescription: json.ResponseDescription ?? "Success",
  };
}
