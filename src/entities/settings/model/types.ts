import {TTheme} from '@/shared';

export interface ISettingsState {
  appVersion: string;
  theme: TTheme;
  fastInputMode: boolean;
  backup: {
    isAutoSync: boolean;
    lastBackup: number | null;
  };
}
