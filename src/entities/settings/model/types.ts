import {TTheme} from '@/shared';

export type TDailyNotificationIds = {
  [key: string]: string;
};

export type TDailyNotificationData = {
  hour: number;
  minute: number;
  turnedOff?: boolean;
};

export interface ISettingsState {
  appVersion: string;
  theme: TTheme;
  fastInputMode: boolean;
  backup: {
    isAutoSync: boolean;
    lastBackup: number | null;
  };
  dailyReminder: {
    beginning: TDailyNotificationData;
    end: TDailyNotificationData;
  };
}
