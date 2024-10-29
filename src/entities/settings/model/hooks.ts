import {bindActionCreators} from '@reduxjs/toolkit';
import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {settingsSlice} from './settingsSlice';
import {RootState} from '@/app/store';

export const useSettingsActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators(settingsSlice.actions, dispatch),
    [dispatch],
  );
};

export const useSettings = () => {
  const settings = useSelector((state: RootState) => state.settings);
  return settings;
};

export const useFastInputMode = () => {
  const mode = useSelector((state: RootState) => state.settings.fastInputMode);
  return mode;
};

export const useBackupInfo = () => {
  const backup = useSelector((state: RootState) => state.settings.backup);
  return backup;
};
