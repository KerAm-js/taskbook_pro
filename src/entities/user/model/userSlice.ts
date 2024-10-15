import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./types";

const initialState: User = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: User, action: PayloadAction<User>) => {
      const { uid, name, email, emailVerified } = action.payload;
      state.uid = uid;
      state.email = email;
      state.emailVerified = emailVerified;
      state.name = name;
    },
    updateName: (state: User, action: PayloadAction<User["name"]>) => {
      state.name = action.payload;
      const updateTime = Date.now();
      if (!state.nameUpdatedAt) {
        state.nameUpdatedAt = [updateTime];
      } else if (state.nameUpdatedAt.length === 1) {
        state.nameUpdatedAt = [state.nameUpdatedAt[0], updateTime];
      } else {
        state.nameUpdatedAt = [state.nameUpdatedAt[1], updateTime];
      }
    },
    updateEmail: (state: User, action: PayloadAction<User["name"]>) => {
      state.email = action.payload;
      state.emailVerified = false;
      const updateTime = Date.now();
      if (!state.emailUpdatedAt) {
        state.emailUpdatedAt = [updateTime];
      } else if (state.emailUpdatedAt.length === 1) {
        state.emailUpdatedAt = [state.emailUpdatedAt[0], updateTime];
      } else {
        state.emailUpdatedAt = [state.emailUpdatedAt[1], updateTime];
      }
    },
    removeUser: (state: User) => {
      state.uid = initialState.uid;
      state.email = initialState.email;
      state.emailVerified = initialState.emailVerified;
      state.name = initialState.name;
    },
  },
});
