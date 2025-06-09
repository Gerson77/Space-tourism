export function parseDistance(raw: string): number {
  const clean = raw.replace(/[^0-9.,]/g, "").replace(",", ".");
  const num = parseFloat(clean);

  if (raw.includes("mil")) return num * 1_000_000;
  if (raw.includes("bil")) return num * 1_000_000_000;

  return num; // Assume valor em milhar se tiver vírgula
}

export function formatDistance(raw: string, value: number): string {
  if (raw.includes("mil")) return `${(value / 1_000_000).toFixed(0)} mil. km`;
  if (raw.includes("bil")) return `${(value / 1_000_000_000).toFixed(1)} bil. km`;

  // valor normal com milhar
  return `${Math.round(value).toLocaleString("en-US")} km`;
}

export function parseTravel(raw: string): number {
  const clean = raw.replace(/[^\d.]/g, "");
  const num = parseFloat(clean);
  return isNaN(num) ? 0 : num;
}

export function formatTravel(raw: string, value: number): string {
  if (raw.includes("month")) return `${Math.round(value)} months`;
  if (raw.includes("year")) return `${Math.round(value)} years`;
  if (raw.includes("day")) return `${Math.round(value)} days`;
  return `${Math.round(value)}`;
}
