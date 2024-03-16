import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

// Custom hook to keep track of current session scroll position
// As the page is manually scrolled, the `currentSessionScrollIndex` state will match the session index
//   of the first image within the viewport.
// This allows for dynamic highlighting of the navigation menu buttons as the page is scrolled.
export function useScrollHandler(props) {
  // State
  const [currentSessionScrollIndex, setCurrentSessionScrollIndex] = useState(0);
  // Ref
  const galleryContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {

      // Get all <a> image elements (by their `data-session` tags)
      const imageBoxes = galleryContainerRef.current.querySelectorAll('[data-session]');
      let newCurrentImageBox = null;

      imageBoxes.forEach(imageBox => {
        const rect = imageBox.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0 && !newCurrentImageBox) {
          newCurrentImageBox = imageBox.getAttribute('data-session');
        }
      });

      setCurrentSessionScrollIndex(newCurrentImageBox);

    };

    // Debounce scroll handler to avoid overzealous session index updating
    const debouncedHandleScroll = _.debounce(handleScroll, 100);

    // Add scroll listener
    window.addEventListener('scroll', debouncedHandleScroll);
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      debouncedHandleScroll.cancel();
    }
  }, []);

  return { currentSessionScrollIndex, galleryContainerRef };
}