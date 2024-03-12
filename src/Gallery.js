import logo from './logo.svg';
import './Gallery.css';
import GalleryStardewValley from './games/GalleryStardewValley';

function Gallery() {
  return (

    <div className="gallery">

      <GalleryStardewValley
        galleryID="stardew-valley"
        images={[
          {
            largeURL:
              'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-2500.jpg',
            thumbnailURL:
              'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-200.jpg',
            width: 1875,
            height: 2500,
          },
          {
            largeURL:
              'https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg',
            thumbnailURL:
              'https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg',
            width: 1669,
            height: 2500,
          },
          {
            largeURL:
              'https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-2500.jpg',
            thumbnailURL:
              'https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-200.jpg',
            width: 2500,
            height: 1666,
          },
        ]}
      />
      
    </div>

  );
}

export default Gallery;
