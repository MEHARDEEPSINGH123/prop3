/**
 * Deterministic number and currency formatting utilities.
 * Avoids browser-locale hydration mismatches (e.g. en-US vs en-IN lakh formatting).
 */

export function formatNumber(val: number | string): string {
  const num = typeof val === 'string' ? parseFloat(val) : val
  if (isNaN(num)) return '0'
  const rounded = Math.round(num)
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function formatCurrency(val: number | string, prefix: string = 'S$ '): string {
  return `${prefix}${formatNumber(val)}`
}

export function formatMillion(val: number): string {
  return `S$ ${(val / 1000000).toFixed(1)}M`
}
