import {TTheme} from '@/shared';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ISettingsState} from './types';

const initialState: ISettingsState = {
  appVersion: '3.0',
  theme: 'branded',
  fastInputMode: true,
  backup: {
    isAutoSync: false,
    lastBackup: null,
  },
  dailyReminder: {
    beginning: {hour: 9, minute: 0},
    end: {hour: 18, minute: 0},
  },
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<TTheme>) => {
      state.theme = action.payload;
    },
    setLastBackup: (
      state,
      action: PayloadAction<ISettingsState['backup']['lastBackup']>,
    ) => {
      state.backup.lastBackup = action.payload;
    },
    toggleFastInputMode: state => {
      state.fastInputMode = !state.fastInputMode;
    },
    toggleAutoSync: state => {
      state.backup.isAutoSync = !state.backup.isAutoSync;
    },
    setDailyReminder: (
      state,
      action: PayloadAction<
        Pick<
          ISettingsState['dailyReminder']['beginning'],
          'hour' | 'minute'
        > & {type: keyof ISettingsState['dailyReminder']}
      >,
    ) => {
      state.dailyReminder[action.payload.type] = action.payload;
    },
  },
});
