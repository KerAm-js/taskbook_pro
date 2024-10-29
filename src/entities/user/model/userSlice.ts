import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUserState, User} from './types';
import {changeNameThunk, signinThunk, signoutThunk} from '../api/auth.api';

const initialState: IUserState = {
  loading: false,
  error: null,
  success: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const {uid, name, email, emailVerified} = action.payload;
      state.uid = uid;
      state.email = email;
      state.emailVerified = emailVerified;
      state.name = name;
    },
    updateName: (state, action: PayloadAction<User['name']>) => {
      state.name = action.payload;
    },
    updateEmail: (state, action: PayloadAction<User['name']>) => {
      state.email = action.payload;
      state.emailVerified = false;
    },
    clearMessages: state => {
      state.loading = false;
      state.error = null;
      state.success = null;
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
      state.email = action.payload.email;
      state.emailVerified = action.payload.emailVerified;
      state.name = action.payload.name;
      state.uid = action.payload.uid;
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
      state.email = undefined;
      state.emailVerified = undefined;
      state.loading = false;
      state.name = undefined;
      state.uid = undefined;
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
      state.name = name;
    });
    builder.addCase(changeNameThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || null;
      state.success = null;
    });
  },
});
