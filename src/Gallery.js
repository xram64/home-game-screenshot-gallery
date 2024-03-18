import './Gallery.css';
import GalleryView from './GalleryView';
import GalleryNavigation from './GalleryNavigation';

// Gallery data
import {
  galleryID_StardewValley_TMAFarm,
  images_StardewValley_TMAFarm,
  navHandler_StardewValley_TMAFarm,
  sessionIndexList_StardewValley_TMAFarm,
} from './games/StardewValley/g_StardewValley_TMAFarm';

import { useScrollHandler } from './games/StardewValley/g_StardewValley_TMAFarm_ScrollHandler';

// [Gallery]
export default function Gallery() {
  // TODO: Consider generalizing this custom hook to deal with different grouping methods.
  const { currentSessionScrollIndex, galleryContainerRef } = useScrollHandler();

  return (
    <>
      <div className="header">
        <span className="header-title">Stardew Valley – TMA Farm (2023-24)</span>
      </div>
      <div className="content" id={"gallery--" + galleryID_StardewValley_TMAFarm}>

        <GalleryNavigation
          galleryID={galleryID_StardewValley_TMAFarm}
          images={images_StardewValley_TMAFarm}
          sessionIndexList={sessionIndexList_StardewValley_TMAFarm}
          onNavigate={navHandler_StardewValley_TMAFarm}
          currentSessionScrollIndex={currentSessionScrollIndex}
        />

        <GalleryView
          galleryID={galleryID_StardewValley_TMAFarm}
          images={images_StardewValley_TMAFarm}
          sessionIndexList={sessionIndexList_StardewValley_TMAFarm}
          galleryContainerRef={galleryContainerRef}
        />

      </div>
    </>
  );

}
