import { ISettingsState } from "@/entities/settings";
import { setNotification } from "@/shared";

export const updateDailyNotification = async ({
  type,
  title,
  body,
  date,
  hour,
  minute,
}: {
  type: keyof ISettingsState["dailyReminder"];
  title: string;
  body: string;
  date: number;
  hour: number;
  minute: number;
}) => {
  const notificationDate = new Date(date).setHours(hour, minute, 0, 0);
  const isTimeExpired = Date.now() >= notificationDate;
  if (isTimeExpired) return;

  const id = `${date}:${type}`;
  setNotification({
    title,
    body,
    id,
    date: notificationDate,
  });
};
