// Helper functions for parsing image metadata in filenames \\
// -------------------------------------------------------- \\


// Parse datetime strings in YYYYMMDDhhmmss format (Steam screenshot format)
// Returns a custom datetime object
export function parse_datetime_YYYYMMDDhhmmss(datetime) {
  if (datetime.length != 14)
    console.error("[parse_datetime_YYYYMMDDhhmmss] Invalid datetime string: `%s`", datetime);

  const year = parseInt(datetime.substring(0, 4), 10);
  const month = parseInt(datetime.substring(4, 6), 10);
  const day = parseInt(datetime.substring(6, 8), 10);
  const hour = parseInt(datetime.substring(8, 10), 10);
  const min = parseInt(datetime.substring(10, 12), 10);
  const sec = parseInt(datetime.substring(12, 14), 10);

  // Create Date object (mostly to get the string version of the month)
  const dateObj = new Date(year, month - 1, day, hour, min, sec);
  const monthShort = dateObj.toLocaleDateString('en-US', { month: 'short' });
  const monthLong = dateObj.toLocaleDateString('en-US', { month: 'long' });
  const weekdayShort = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
  const weekdayLong = dateObj.toLocaleDateString('en-US', { weekday: 'long' });

  // Convert `hour` to 12hr time
  var hour_12hr = (hour > 12) ? (hour - 12) : (hour);
  if (hour_12hr == 0) hour_12hr = 12;  // Handle midnight (12 am)
  const ampm = (hour > 11) ? 'pm' : 'am';

  // Zero-padded time strings
  const hour_pad = String(hour).padStart(2, '0');
  const min_pad = String(min).padStart(2, '0');
  const sec_pad = String(sec).padStart(2, '0');

  return {
    'year': year,
    'month': month,
    'day': day,
    'hour': hour,
    'hour_12hr': hour_12hr,
    'min': min,
    'sec': sec,
    'ampm': ampm,
    'weekdayShort': weekdayShort,
    'weekdayLong': weekdayLong,
    'fullDateShort': `${month}/${day}/${year}`,
    'fullDateLong': `${monthLong} ${day}, ${year}`,
    'fullTime24hr': `${hour_pad}:${min_pad}`,
    'fullTime24hrSecs': `${hour_pad}:${min_pad}:${sec_pad}`,
    'fullTime12hr': `${hour_12hr}:${min_pad} ${ampm}`,
    'fullTime12hrSecs': `${hour_12hr}:${min_pad}:${sec_pad} ${ampm}`,
    'dateObj': dateObj,
  }
}