import { RootState } from '..';

export const activeIndexSelector = (state: RootState) => state.tabbar.activeIndex;
