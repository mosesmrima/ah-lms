import { useState, useEffect } from 'react';

// Hook to track scroll position for features like scroll-to-top buttons or scroll animations
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Update scroll position
      setScrollPosition(currentScrollPos);
      
      // Determine scroll direction
      if (currentScrollPos > lastScrollTop) {
        setScrollDirection('down');
      } else if (currentScrollPos < lastScrollTop) {
        setScrollDirection('up');
      }
      
      // Update last scroll position
      setLastScrollTop(currentScrollPos);
      
      // Set scrolling state
      setIsScrolling(true);
      
      // Clear the timeout if it's already set
      clearTimeout(scrollTimeout);
      
      // Set a timeout to detect when scrolling stops
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [lastScrollTop]);

  return { scrollPosition, isScrolling, scrollDirection };
}
