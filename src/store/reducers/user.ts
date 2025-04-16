import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  token: string,
  isLoginIn: boolean;
  user_info?: UserInfo
}

const initialState: UserState = {
  token: "",
  isLoginIn: false,
}

export const user_slice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const user_info = action.payload;
      state.user_info = user_info;
    },
    loginFromStorage: (state, action) => {
      const token = action.payload;
      state.token = token;
      state.isLoginIn = true;
    },
  }
})

export const { setUserInfo, loginFromStorage } = user_slice.actions;
