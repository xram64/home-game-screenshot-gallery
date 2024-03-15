// Gallery data
// Stardew Valley - TMA Farm

// TODO: Add a new prop to `images_StardewValley_TMAFarm` for a "group"/"category".
//        (i.e. one group for each month or "session")
//       This can be used to break up the image gallery into sections.
//       The thumbs for each section will be drawn in its own box, held in their own individual grid,
//        with a subheader/tag on the box showing the group./
//       Add a scrollbar selector to the right to list and follow the groups?

import { parse_datetime_YYYYMMDDhhmmss } from "../../helpers/FilenameParsing";

// Props
export const galleryID_StardewValley_TMAFarm = "stardew-valley-tma-farm";
export const images_StardewValley_TMAFarm = [];

// Populate `images`
const TEMP_SV_IMAGE_LIST = [
    "20240311203922_1.jpg",
    "20240311205303_1.jpg",
    "20240311205326_1.jpg",
    "20240311205329_1.jpg",
    "20240311210515_1.jpg",
    "20240311210523_1.jpg",
    "20240311211916_1.jpg",
    "20240311213027_1.jpg",
    "20240311213035_1.jpg",
    "20240311213039_1.jpg",
    "20240311213337_1.jpg",
    "20240311214015_1.jpg",
    "20240311214026_1.jpg",
    "20240311214042_1.jpg",
    "20240311214436_1.jpg",
    "20240311214457_1.jpg",
    "20240311221009_1.jpg",
    "20240311221012_1.jpg",
    "20240311221529_1.jpg",
    "20240311222045_1.jpg",
    "20240311222134_1.jpg",
    "20240311223238_1.jpg",
    "20240311223856_1.jpg",
    "20240311224345_1.jpg",
    "20240311224524_1.jpg",
    "20240311224612_1.jpg",
    "20240311224638_1.jpg",
    "20240311231027_1.jpg",
    "20240311230238_1.jpg",
    "20240311231023_1.jpg",
];

const img_url_prefix = "https://www.xram.horse/games/screenshots/StardewValley/";

TEMP_SV_IMAGE_LIST.forEach(img_name => {
    // Parse metadata from image filename
    const img_datetime_str = img_name.split('_')[0];
    const img_datetime = parse_datetime_YYYYMMDDhhmmss(img_datetime_str)

    // Construct HTML caption as JSX
    const caption = (
        <span>
            <strong>Stardew Valley – TMA Farm</strong>
            <br />
            {img_datetime.fullDateShort} | {img_datetime.fullTime12hr}
        </span>
    )

    // Add the image to the list
    images_StardewValley_TMAFarm.push(
        {
            fullURL: img_url_prefix + img_name,
            thumbURL: img_url_prefix + "thumbs/" + img_name,
            width: 1920,
            height: 1017,
            caption: caption,
        }
    )
});
