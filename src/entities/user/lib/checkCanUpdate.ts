import {getDateLater} from '@/shared/lib/dates';
import {TUserUpdates} from '../model/types';

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

export const getNewUpdatedAt = (
  updates?: TUserUpdates,
): TUserUpdates | undefined => {
  const now = Date.now();
  if (!updates) {
    return [now];
  } else if (updates.length === 1) {
    return [updates[0], now];
  } else if (updates.length === 2) {
    return [updates[1], now];
  }
};
