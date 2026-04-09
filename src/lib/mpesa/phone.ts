/**
 * Normalize user input to Safaricom M-Pesa format: 2547XXXXXXXX (12 digits).
 */
export function normalizeKenyaMsisdn(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("254")) return digits;
  if (digits.length === 10 && digits.startsWith("0")) return `254${digits.slice(1)}`;
  if (digits.length === 9 && digits.startsWith("7")) return `254${digits}`;
  if (digits.length === 10 && digits.startsWith("7")) return `254${digits.slice(1)}`;
  return null;
}
