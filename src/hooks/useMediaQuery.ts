import { useCallback, useSyncExternalStore } from "react";

/**
 * Custom hook that tracks the state of a media query.
 * @param query The media query string to track (e.g., '(max-width: 767px)')
 * @returns boolean indicating if the media query matches
 */
export const useMediaQuery = (query: string): boolean => {
  const subscribe = useCallback((onStoreChange: () => void) => {
    if (typeof window === "undefined") {
      return () => {};
    }

    const mediaQueryList = window.matchMedia(query);
    const listener = () => onStoreChange();

    mediaQueryList.addEventListener("change", listener);

    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, [query]);

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(query).matches;
  }, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
};
