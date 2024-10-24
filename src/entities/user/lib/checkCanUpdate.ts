import {getDateLater} from '@/shared/lib/dates';
import {TUserUpdates} from '../model/types';
import { USER_UPDATES_PERIOD } from '@/shared';

export const checkCanUpdate = (updates?: TUserUpdates): boolean => {
  if (!updates) {
    return true;
  } else if (updates.length === 1) {
    return true;
  } else {
    const nextUpdateDate = getDateLater(USER_UPDATES_PERIOD, updates[0]);
    return Date.now() >= nextUpdateDate.valueOf();
  }
};

export const getNewUpdatedAt = (
  updates?: TUserUpdates,
): TUserUpdates => {
  const now = Date.now();
  if (!updates) {
    return [now];
  } else if (updates.length === 1) {
    return [updates[0], now];
  } else {
    return [updates[1], now];
  }
};
