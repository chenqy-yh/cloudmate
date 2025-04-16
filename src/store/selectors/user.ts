import { RootState } from '../index'

export const userInfoSelector = (state: RootState) => state.user.user_info;
export const userContactsSelector = (state: RootState) => state.user.contacts;