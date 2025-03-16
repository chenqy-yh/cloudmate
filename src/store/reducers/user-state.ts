import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  token: string,
  isLoginIn: boolean;
}

const initialState: UserState = {
  token: "",
  isLoginIn: false,
}

export const userStateSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    login: (state, action) => {
      // TODO
    },
    loginFromStorage: (state, action) => {
      const token = action.payload;
      state.token = token;
      state.isLoginIn = true;
    }
  }
})

export const { login, loginFromStorage } = userStateSlice.actions;
