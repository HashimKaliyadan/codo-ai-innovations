import { useEffect, useState } from 'react';

/**
 * Custom hook that tracks the state of a media query.
 * @param query The media query string to track (e.g., '(max-width: 767px)')
 * @returns boolean indicating if the media query matches
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Ensure we are in the browser
    if (typeof window === 'undefined') return;

    const mediaQueryList = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQueryList.matches);

    // Create listener
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Add listener
    mediaQueryList.addEventListener('change', listener);

    // Cleanup
    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
};
