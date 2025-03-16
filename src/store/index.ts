import { configureStore } from "@reduxjs/toolkit";
import { tabbarSlice } from "./reducers/tabbar";
import { userStateSlice } from './reducers/user-state'
import { authSlice } from "./reducers/auth";
import { attendanceSlice } from './reducers/attandence'

const store = configureStore({
  reducer: {
    tabbar: tabbarSlice.reducer,
    userState: userStateSlice.reducer,
    auth: authSlice.reducer,
    attendance: attendanceSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
