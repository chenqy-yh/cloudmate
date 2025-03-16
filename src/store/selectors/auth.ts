import { RootState } from "..";

export const authorization_selector = (state: RootState) => state.auth.Authorization;

export const unique_device_token_selector = (state: RootState) => state.auth['x-unique-device-token'];

export const user_uuid_selector = (state: RootState) => state.auth['x-user-uuid']
