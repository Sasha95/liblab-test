export function formatNumber(value: number): string {
  if (value == null || isNaN(value)) return '';
  if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}B`;
  }
  return `${value}M`;
}
