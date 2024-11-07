import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUserState, Rate, User} from './types';
import {signinThunk, signoutThunk} from '../api/auth.api';
import {changeNameThunk} from '../api/userInfo.api';

const initialState: IUserState = {
  loading: false,
  error: null,
  success: null,
  subscription: {
    trialPeriodStartDate: Date.now(),
    isTrialPeriodExpired: false,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
    updateName: (state, action: PayloadAction<User['name']>) => {
      if (state.data) state.data.name = action.payload;
    },
    updateEmail: (state, action: PayloadAction<User['name']>) => {
      if (state.data) {
        state.data.email = action.payload;
        state.data.emailVerified = false;
      }
    },
    clearMessages: state => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
    setSubscriptionRate: (state, action: PayloadAction<Rate>) => {
      state.subscription = {
        ...state.subscription,
        rate: action.payload,
        lastSubscriptionCheckDate: Date.now(),
        isTrialPeriodExpired: false,
      };
    },
    endTrialPeriod: state => {
      state.subscription = {
        ...state.subscription,
        isTrialPeriodExpired: false,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(signinThunk.pending, state => {
      state.loading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(signinThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = null;
      state.data = {
        ...action.payload,
      };
    });
    builder.addCase(signinThunk.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload || null;
    });
    builder.addCase(signoutThunk.pending, state => {
      state.loading = true;
      state.success = null;
      state.error = null;
    });
    builder.addCase(signoutThunk.fulfilled, state => {
      state.data = undefined;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(signoutThunk.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload || null;
    });
    builder.addCase(changeNameThunk.pending, state => {
      state.loading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(changeNameThunk.fulfilled, (state, action) => {
      const {title, message, name} = action.payload;
      state.loading = false;
      state.error = null;
      state.success = {
        title,
        message,
      };
      if (state.data) state.data.name = name;
    });
    builder.addCase(changeNameThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || null;
      state.success = null;
    });
  },
});
