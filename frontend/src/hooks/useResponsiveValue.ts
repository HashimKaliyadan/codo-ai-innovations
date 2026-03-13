import { useMediaQuery } from './useMediaQuery';
import { MEDIA_QUERIES } from '../constants/breakpoints';

interface ResponsiveValue<T> {
  mobile?: T;
  tablet?: T;
  desktop?: T;
  default: T;
}

export const useResponsiveValue = <T,>(
  values: ResponsiveValue<T>
): T => {
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);
  const isTablet = useMediaQuery(MEDIA_QUERIES.tablet);

  if (isMobile && values.mobile !== undefined) return values.mobile;
  if (isTablet && values.tablet !== undefined) return values.tablet;
  if (!isMobile && !isTablet && values.desktop !== undefined) return values.desktop;
  
  return values.default;
};
