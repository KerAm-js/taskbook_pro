import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "./userSlice";
import { RootState } from "@/app/store";

export const useUserActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators(userSlice.actions, dispatch),
    [dispatch]
  );
};

export const useUser = () => {
  const user = useSelector((state: RootState) => state.user);
  return user;
};
