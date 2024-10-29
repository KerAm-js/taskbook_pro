import {TTheme} from '@/shared';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ISettingsState} from './types';

const initialState: ISettingsState = {
  appVersion: '1.0',
  theme: 'branded',
  fastInputMode: true,
  backup: {
    isAutoSync: false,
    lastBackup: null,
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
  },
});
