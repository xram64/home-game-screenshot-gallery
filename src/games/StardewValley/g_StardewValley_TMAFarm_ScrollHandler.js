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

      // Find all <a> image elements marked as the 'first' image in a session via their `data-session-edge` tag.
      const imageBoxes = galleryContainerRef.current.querySelectorAll("[data-session-edge='first']");

      let topImageBoxSessionIndex = null;

      // Scan all boxes around <a> gallery items until an item returns `true`.
      // The resulting session index will be taken from the earliest leading ('first') session edge found within the viewport.
      const sessionEdgeFound = _.some(imageBoxes, (imageBox) => {
        // Set the `topImageBoxSessionIndex` variable to the session index for this box.
        // This variable will be overwritten until a box is found to be within the viewport bounds.
        topImageBoxSessionIndex = imageBox.getAttribute('data-session');

        // Get the rectangle surrounding the image (<a> element), relative to the client viewport.
        const rect = imageBox.getBoundingClientRect();

        // Return `true` if this box is fully within the viewport bounds, ending the iteration.
        if (rect.bottom < window.innerHeight && rect.top >= 0)
          return true
      });

      // If no leading session edge box was found entirely within the viewport
      //   (i.e. if the window is in the middle of a long session),
      //   fallback to choosing the session index of the first box of any kind within the viewport.
      if (!sessionEdgeFound) {
        const imageBoxes = galleryContainerRef.current.querySelectorAll("[data-session]");
        _.some(imageBoxes, (imageBox) => {
          topImageBoxSessionIndex = imageBox.getAttribute('data-session');
  
          const rect = imageBox.getBoundingClientRect();
  
          if (rect.bottom < window.innerHeight && rect.top >= 0)
            return true
        });
      }


      // Set the session scoll index to the session index of the box returned above.
      setCurrentSessionScrollIndex(topImageBoxSessionIndex);

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