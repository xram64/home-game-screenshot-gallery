import React, { useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipeDynamicCaption from 'photoswipe-dynamic-caption-plugin';
// import 'photoswipe/style.css';
import '../photoswipe/photoswipe.css';
import '../photoswipe/photoswipe-dynamic-caption-plugin.css';

export default function GalleryStardewValley(props) {
  useEffect(() => {

    let lightbox = new PhotoSwipeLightbox({
      gallery: '#' + props.galleryID,
      children: 'a',
      pswpModule: () => import('photoswipe'),

      /* [Optional padding]
      paddingFn: (viewportSize) => {
        return {
          top: 30, bottom: 30, left: 70, right: 70
        }
      },
      */
    });

    const captionPlugin = new PhotoSwipeDynamicCaption(lightbox, {
      /// Caption plugin options ///

      // Position type of the caption can be 'auto', 'below', or 'aside'.
      // • 'below' - caption will always be placed below the image
      // • 'aside' - caption will always be placed on the right side of the image
      // • 'auto' - the plugin will try to automatically determine the best position (depending on available space)
      type: 'aside',

      // Maximum window width at which mobile layout should be used,
      //  or a function that should return true if mobile layout should be used.
      mobileLayoutBreakpoint: 700,

      // A ratio defines the amount of horizontal empty space before the mobile caption switches to an "overlap" layout.
      // For example, if it's set to 0.3 - the caption will start overlapping the image when more than 30% of horizontal
      //  space is not occupied by an image.
      // If you set it to 0 - the caption will always overlap.
      // If you set it to 1 - the caption will constantly shift the image (unless it's taller than the viewport).
      mobileCaptionOverlapRatio: 1,

      // When the caption x position is less than this value, it'll get class pswp__dynamic-caption--on-hor-edge.
      // You may use it to apply different styling, such as horizontal padding.
      //horizontalEdgeThreshold: 20,

      // If enabled, the image will always be vertically centered in the remaining space between the caption and the rest of the viewport.
      // If set to false (default) the image will lift up only if the caption does not fit below.
      //verticallyCenterImage: false
    });

    lightbox.init();

    return () => {
      lightbox.destroy();
      lightbox = null;
    };

  }, []);

  return (
    <div className="pswp-gallery" id={props.galleryID}>
      {props.images.map((image, index) => (
        <>

          <a
            href={image.largeURL}
            data-pswp-width={image.width}
            data-pswp-height={image.height}
            key={props.galleryID + '-' + index}
            target="_blank"
            rel="noreferrer"
          >
            <img src={image.thumbnailURL} alt="" />
          </a>

          <div class="pswp-caption-content">
            Test image caption...
          </div>

        </>
      ))}
    </div>
  );
}