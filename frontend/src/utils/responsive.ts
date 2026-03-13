export const getResponsiveFont = (minSize: number, maxSize: number, minViewport: number = 320, maxViewport: number = 1920): string => {
  const slope = (maxSize - minSize) / (maxViewport - minViewport);
  const intercept = minSize - (slope * minViewport);
  return `clamp(${minSize}px, ${intercept}px + ${slope * 100}vw, ${maxSize}px)`;
};

export const getResponsiveSpacing = (mobile: number, tablet: number, desktop: number): string => {
  return `clamp(${mobile}px, 3vw, ${desktop}px)`;
};
