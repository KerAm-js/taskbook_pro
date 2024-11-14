import {bindActionCreators} from '@reduxjs/toolkit';
import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {userSlice} from './userSlice';
import {RootState} from '@/app/store';
import * as apiAuthActions from '../api/auth.api';
import * as apiUserActions from '../api/userInfo.api';

const actions = {
  ...userSlice.actions,
  ...apiAuthActions,
  ...apiUserActions,
};

export const useUserActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
};

export const useUser = () => {
  const user = useSelector((state: RootState) => state.user);
  return user;
};

export const useIsUserAskedRateApp = () => {
  const result = useSelector(
    (state: RootState) => state.user.isUserAskedRateApp,
  );
  return result;
};

export const useFirstAppRunDate = () => {
  const result = useSelector((state: RootState) => state.user.firstAppRunDate);
  return result;
};
