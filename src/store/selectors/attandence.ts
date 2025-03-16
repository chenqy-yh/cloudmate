import { RootState } from "..";

export const attendance_selector = (state: RootState) => state.attendance;

export const atd_reflush_selector = (state: RootState) => state.attendance.reflush;

export const punch_record_selector = (state: RootState) => state.attendance.punch_record;

export const cur_sign_in_type_selector = (state: RootState) => state.attendance.cur_sign_in_type;
