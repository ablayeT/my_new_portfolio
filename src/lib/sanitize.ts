export function sanitizeInput(input: string, max = 6000): string {
  const cleaned = input
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\r\n?/g, "\n")
    .slice(0, max)
    .trim();
  return cleaned;
}

export function looksSuspicious(input: string) {
  const redFlags = [
    /ignore (all|previous) instructions/i,
    /exfiltrate/i,
    /system prompt/i,
    /reveal (the )?system/i,
  ];
  return redFlags.some((r) => r.test(input));
}
