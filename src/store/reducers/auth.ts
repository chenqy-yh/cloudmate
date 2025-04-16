import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Taro from "@tarojs/taro";
import http from '@/apis/request'


const initialState = {
  Authorization: "",
  "x-unique-device-token": "",
  "x-user-uuid": ""
};

type InitialState = typeof initialState;


const setStateAndStorage = (state: InitialState, key: keyof InitialState, value: string) => {
  http.setHeaderConfig(key, value);
  Taro.setStorageSync(key, value);
  state[key] = value;
}


export const auth_slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<Partial<typeof initialState>>) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        setStateAndStorage(state, key as keyof InitialState, value);
      })
    },
    resetAuth: (state) => {
      Object.keys(state).forEach(key => {
        setStateAndStorage(state, key as keyof InitialState, "");
      })
    }
  }
})

export const { setAuthData, resetAuth } = auth_slice.actions;
