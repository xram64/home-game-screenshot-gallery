import './Gallery.css';
import GalleryView from './GalleryView';

// Gallery data
import { galleryID_StardewValley_TMAFarm, images_StardewValley_TMAFarm } from './games/StardewValley/g_StardewValley_TMAFarm';


function Gallery() {
  return (
    <>
      <div className="header">
        <span className="header-title">Stardew Valley – TMA Farm (2023-24)</span>
      </div>
      <div className="gallery" id={"gallery--" + galleryID_StardewValley_TMAFarm}>

        <GalleryView
          galleryID={galleryID_StardewValley_TMAFarm}
          images={images_StardewValley_TMAFarm}
        />

      </div>
    </>
  );
}

export default Gallery;
