// Gallery data
// Stardew Valley - TMA Farm

// TODO: Add full farm screenshots from other folder.

import _ from 'lodash';
import { parse_datetime_YYYYMMDDhhmmss } from "../../helpers/FilenameParsing";
import filename_list from './StardewValley_TMAFarm_TEMP_FileList.json';

// [Props]
// - galleryID_StardewValley_TMAFarm
// - images_StardewValley_TMAFarm
// - sessionIndexList_StardewValley_TMAFarm
// - navHandler_StardewValley_TMAFarm

export const galleryID_StardewValley_TMAFarm = "stardew-valley-tma-farm";
export const images_StardewValley_TMAFarm = [];

const img_url_prefix = "https://www.xram.horse/games/screenshots/StardewValley/";

// Break file list into sessions
const sessionIndexToFilenames = generateSessionList(filename_list);
export const sessionIndexList_StardewValley_TMAFarm = Object.keys(sessionIndexToFilenames);

// Iterate over all sessions, one index at a time (using lodash).
_.forEach(sessionIndexToFilenames, (session, sessionIndex) => {

  const sessionDate = session['date'];
  const sessionFileList = session['files'];

  // Iterate over files in the session file list
  sessionFileList.forEach(img_name => {

    // Parse metadata from image filename
    const img_datetime_str = img_name.split('_')[0];
    const img_datetime = parse_datetime_YYYYMMDDhhmmss(img_datetime_str);

    // Construct HTML caption as JSX
    const caption = (
      <span className="caption-text">
        {/* <strong>Stardew Valley – TMA Farm</strong> */}
        {/* <br /> */}
        <strong>Session {sessionIndex}</strong> ({img_datetime.weekdayShort} {img_datetime.fullDateShort}) | {img_datetime.fullTime12hr}
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
        sessionIndex: sessionIndex,
        sessionDate: sessionDate,
      }
    )
  });

});


// Scans file list to determine dates and order of play sessions.
function generateSessionList(filenames) {
  // 1. Let the date of the first file be the first session date.
  // 2. Scan ahead over all files with a date 0-1 days after the session date
  //      with a time between the initial time and '0600', collecting all files
  //      found in the session list.
  // 3. When the next file outside of the session is found, start a new session.
  // 4. Repeat until all sessions are identified, returning the `sessionIndexToFilenames`
  //      object, which maps a session index to an object with `date` and `files` keys.

  // Note: This function assumes the `filenames` list is sorted in ascending date order.
  // Note: Session indices start at `1`.

  // sessionIndexToFilenames = {
  //      1: {'date': Date(20240101), 'files': ['filename1.jpg', 'filename2.jpg', ...]},
  //      2: {'date': Date(20240102), 'files': ['filename6.jpg', 'filename7.jpg', ...]},
  //    }

  const sessionIndexToFilenames = {};

  var session_start_filename;
  var session_start_datetime;
  var session_end_datetime;

  var curSessionIndex = 0;
  var curFilenameDate;

  filenames.forEach((curFilename, i) => {
    // If this filename is past the session end date (or if this is the first iteration),
    //   set the session start date to match this file and update the session arrays.
    curFilenameDate = parse_datetime_YYYYMMDDhhmmss(curFilename.split('_')[0]).dateObj;
    if (curFilenameDate > session_end_datetime || i === 0) {
      // Advance the session index for the current session (increases to `1` on first iteration).
      curSessionIndex++;

      // Start a new session.
      session_start_filename = curFilename;
      session_start_datetime = new Date(curFilenameDate);

      // Add a new session object to `sessionIndexToFilenames`, setting the 'date'.
      sessionIndexToFilenames[curSessionIndex] = { 'date': session_start_datetime };

      // Add the current filename under the 'files' key of `sessionIndexToFilenames` (initialize 'files' list first).
      sessionIndexToFilenames[curSessionIndex]['files'] = [];
      sessionIndexToFilenames[curSessionIndex]['files'].push(curFilename);

      // Calculate session cutoff datetime (6am on following day, unless start time is between 12am and 6am).
      session_end_datetime = new Date(session_start_datetime);
      if (0 <= session_start_datetime.getHours() && session_start_datetime.getHours() < 6) {
        // Same day (0000 - 0600)
        session_end_datetime.setHours(6, 0, 0);
      }
      else {
        // Next day (0600 - 2400)
        session_end_datetime.setDate(session_end_datetime.getDate() + 1);
        session_end_datetime.setHours(6, 0, 0);
      }

    }
    // If this filename is within the current session window, just add it to the current `sessionIndexToFilenames` list.
    else {
      sessionIndexToFilenames[curSessionIndex]['files'].push(curFilename);
    }

  });


  return sessionIndexToFilenames;
}

// Function to scroll to the location of a selected session index
// Used as the `onNavigate` function in GalleryNavigation.
export const navHandler_StardewValley_TMAFarm = (targetSessionIndex) => {
  const targetElement = document.querySelector(`a[data-session='${targetSessionIndex}']`);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
