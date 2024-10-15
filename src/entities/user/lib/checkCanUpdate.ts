import { getDateLater } from "@/shared/lib/dates";
import { TUserUpdates } from "../model/types";

const UPDATING_PERIOD = 15;

export const checkCanUpdate = (updates?: TUserUpdates): boolean => {
  if (!updates) {
    return true;
  } else if (updates.length === 1) {
    return true;
  } else {
    const nextUpdateDate = getDateLater(UPDATING_PERIOD, updates[0]);
    return Date.now() >= nextUpdateDate.valueOf();
  }
};
