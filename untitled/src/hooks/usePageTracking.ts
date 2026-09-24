// src/hooks/usePageTracking.ts
import { useEffect, useRef } from 'react';
import { initGA, logPageView } from '../utils/analytics';

export const usePageTracking = () => {
  const isTrackedRef = useRef(false);

  useEffect(() => {
    // Initialize Google Analytics on mount
    initGA();

    // In React 18 Strict Mode, useEffect runs twice in development.
    // We use a ref to ensure the initial pageview is only logged once.
    if (!isTrackedRef.current) {
      logPageView(window.location.pathname + window.location.search);
      isTrackedRef.current = true;
    }

    // If you introduce React Router later, you would add logic here
    // to listen to route changes and call logPageView(newUrl).

  }, []); // Empty dependency array means this runs once on mount
};
