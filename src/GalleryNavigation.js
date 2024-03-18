import React, { useEffect } from 'react';

// [Navigation]: A component to contain a navigation menu on the gallery page.
export default function GalleryNavigation(props) {

  return (
    <div className="gallery-nav">
      {props.sessionIndexList.map((sessionIndex) => (
        <button
          className={`gallery-nav-btn ${sessionIndex === props.currentSessionScrollIndex ? 'selected' : ''}`}
          key={sessionIndex}
          onClick={() => props.onNavigate(sessionIndex)}
        >
          Session {sessionIndex}
        </button>
      ))}
    </div>
  );

};
