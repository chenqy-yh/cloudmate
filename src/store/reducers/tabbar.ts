import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TabbarState = {
  activeIndex: number;
};

const initialState: TabbarState = {
  activeIndex: 0,
};

export const tabbarSlice = createSlice({
  name: "tabbar",
  initialState,
  reducers: {
    setActiveIndex: (state, action: PayloadAction<number>) => {
      state.activeIndex = action.payload;
    },
  },
});

export const { setActiveIndex } = tabbarSlice.actions;
