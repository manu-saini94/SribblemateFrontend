import { DateTime } from "luxon";

export const DATE_TIME_FORMAT = "dd MMM yyyy | hh:mma";

export const getDateTime = (timestamp: string) => {
  return DateTime.fromISO(timestamp).toFormat(DATE_TIME_FORMAT);
};
