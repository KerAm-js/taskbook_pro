import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from './types';

const initialState: User = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: User, action: PayloadAction<User>) => {
      const {uid, name, email, emailVerified} = action.payload;
      state.uid = uid;
      state.email = email;
      state.emailVerified = emailVerified;
      state.name = name;
    },
    updateName: (state: User, action: PayloadAction<User['name']>) => {
      state.name = action.payload;
    },
    updateEmail: (state: User, action: PayloadAction<User['name']>) => {
      state.email = action.payload;
      state.emailVerified = false;
    },
    removeUser: (state: User) => {
      state.uid = initialState.uid;
      state.email = initialState.email;
      state.emailVerified = initialState.emailVerified;
      state.name = initialState.name;
    },
  },
});
