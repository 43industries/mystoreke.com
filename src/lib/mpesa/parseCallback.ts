export type ParsedStkCallback = {
  merchantRequestId: string;
  checkoutRequestId: string;
  resultCode: number;
  resultDesc: string;
  amount: number | null;
  mpesaReceiptNumber: string | null;
  phone: string | null;
};

function itemValue(
  items: Array<{ Name?: string; Value?: unknown }> | undefined,
  name: string,
): string | null {
  if (!items) return null;
  const found = items.find((i) => i.Name === name);
  if (found?.Value === undefined || found.Value === null) return null;
  return String(found.Value);
}

/**
 * Parse Daraja STK callback JSON body.
 */
export function parseStkCallbackBody(body: unknown): ParsedStkCallback | null {
  if (!body || typeof body !== "object") return null;
  const b = body as {
    Body?: {
      stkCallback?: {
        MerchantRequestID?: string;
        CheckoutRequestID?: string;
        ResultCode?: number;
        ResultDesc?: string;
        CallbackMetadata?: { Item?: Array<{ Name?: string; Value?: unknown }> };
      };
    };
  };
  const stk = b.Body?.stkCallback;
  if (!stk?.CheckoutRequestID || !stk.MerchantRequestID) return null;

  const items = stk.CallbackMetadata?.Item;
  const amountRaw = itemValue(items, "Amount");
  const amount = amountRaw ? Number(amountRaw) : null;

  return {
    merchantRequestId: stk.MerchantRequestID,
    checkoutRequestId: stk.CheckoutRequestID,
    resultCode: Number(stk.ResultCode ?? -1),
    resultDesc: stk.ResultDesc ?? "",
    amount: Number.isFinite(amount) ? amount : null,
    mpesaReceiptNumber: itemValue(items, "MpesaReceiptNumber"),
    phone: itemValue(items, "PhoneNumber"),
  };
}
