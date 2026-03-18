/**
 * Calculates a responsive font size using CSS clamp.
 */
export const getResponsiveFont = (minSize: number, maxSize: number, minViewport: number = 320, maxViewport: number = 1920): string => {
  const slope = (maxSize - minSize) / (maxViewport - minViewport);
  const intercept = minSize - (slope * minViewport);
  return `clamp(${minSize}px, ${intercept}px + ${slope * 100}vw, ${maxSize}px)`;
};

/**
 * Calculates a responsive spacing value using CSS clamp.
 */
export const getResponsiveSpacing = (mobile: number, tablet: number, desktop: number): string => {
  // Simpler implementation as provided in user request, or could be more complex
  return `clamp(${mobile}px, 3vw, ${desktop}px)`;
};
