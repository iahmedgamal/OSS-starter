const RED_LUMINANCE_WEIGHT = 0.299
const GREEN_LUMINANCE_WEIGHT = 0.587
const BLUE_LUMINANCE_WEIGHT = 0.114
const MAX_CHANNEL_VALUE = 255
const LIGHT_THRESHOLD = 0.5

/**
 * Returns whether a hex background color is 'light' or 'dark'.
 * Uses perceived luminance (WCAG weights: R×0.299, G×0.587, B×0.114).
 * @param hex - 6-char hex string without '#' (e.g. GitHub label color)
 */
export function getReadableTextColor(hex: string): 'light' | 'dark' {
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  const luminance =
    (RED_LUMINANCE_WEIGHT * r + GREEN_LUMINANCE_WEIGHT * g + BLUE_LUMINANCE_WEIGHT * b) /
    MAX_CHANNEL_VALUE
  return luminance > LIGHT_THRESHOLD ? 'light' : 'dark'
}
