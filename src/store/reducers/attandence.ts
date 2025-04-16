import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AttendanceState {
  punch_record: PunchRecord;
  cur_sign_in_type: number;
}

const initialState: AttendanceState = {
  punch_record: [],
  cur_sign_in_type: new Date().getHours() < 14 ? 0 : 1, // 0: 上班, 1: 下班
};

export const attendance_slice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setPunchRecord(state, action: PayloadAction<PunchRecord>) {
      state.punch_record = action.payload;
    },
    addPunchRecord(state, action: PayloadAction<{ index: number; record: PunchRecord[number] }>) {
      state.punch_record[action.payload.index] = action.payload.record;
    },
  },
});

export const { setPunchRecord, addPunchRecord } = attendance_slice.actions;
