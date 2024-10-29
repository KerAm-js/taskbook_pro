import {deleteNotification, setNotification} from '@/shared';
import { ITasksState } from '../model/types';

type TParams = {
  type: keyof ITasksState['reminderSettings']['dailyReminder'];
  title: string;
  body: string;
  date: number;
  hour: number;
  minute: number;
};

const generateDailyNotificationId = (
  date: TParams['date'],
  type: TParams['type'],
) => `${date}:${type}`;

export const deleteDailyNotification = (
  date: TParams['date'],
  type: TParams['type'],
) => {
  deleteNotification(generateDailyNotificationId(date, type));
};

export const setDailyNotification = async ({
  type,
  title,
  body,
  date,
  hour,
  minute,
}: TParams) => {
  const notificationDate = new Date(date).setHours(hour, minute, 0, 0);
  const isTimeExpired = Date.now() >= notificationDate;
  if (isTimeExpired) return;

  const id = generateDailyNotificationId(date, type);
  setNotification({
    title,
    body,
    id,
    date: notificationDate,
  });
};
