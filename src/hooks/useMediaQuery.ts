import { useState, useEffect } from 'react';

// Hook for responsive design - detects if the screen matches a media query
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Avoid running on the server
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);
      
      // Set the initial value
      setMatches(media.matches);
      
      // Define a callback function to handle changes
      const listener = () => setMatches(media.matches);
      
      // Add the callback as a listener
      media.addEventListener('change', listener);
      
      // Remove the listener when the component unmounts
      return () => media.removeEventListener('change', listener);
    }
  }, [query]);

  return matches;
}
