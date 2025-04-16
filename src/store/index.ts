import { configureStore } from "@reduxjs/toolkit";
import {
  auth_slice,
  chat_slice,
  file_slice,
  user_slice,
  tabbar_slice,
  contacts_slice,
  attendance_slice,
} from './reducers'

const store = configureStore({
  reducer: {
    user: user_slice.reducer,
    auth: auth_slice.reducer,
    file: file_slice.reducer,
    chat: chat_slice.reducer,
    tabbar: tabbar_slice.reducer,
    contacts: contacts_slice.reducer,
    attendance: attendance_slice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
