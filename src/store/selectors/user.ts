import { RootState } from '../index'

export const userInfoSelector = (state: RootState) => state.user.user_info;
