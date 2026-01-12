import { useEffect, useRef, useState } from 'react';

/**
 * useScrollAnimation Hook
 * Tracks when an element enters the viewport using IntersectionObserver.
 * * @param {number} threshold - A number between 0 and 1 indicating what percentage of 
 * the target's visibility the observer's callback should be executed.
 * @returns {[React.RefObject, boolean]} - Returns a ref to attach to the element and a visibility boolean.
 */
const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Storing the current ref value in a variable to ensure 
    // we unobserve the correct element during cleanup
    const currentRef = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once the element is visible, we stop observing to save resources
          if (currentRef) {
            observer.unobserve(currentRef);
          }
        }
      },
      {
        root: null, // Defaults to the browser viewport
        rootMargin: '0px',
        threshold: threshold,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup function to prevent memory leaks
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]); // Re-run if threshold changes

  return [ref, isVisible];
};

export default useScrollAnimation;