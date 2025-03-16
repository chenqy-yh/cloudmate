import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AttendanceState {
  reflush: boolean;
  punch_record: PunchRecord;
  cur_sign_in_type: number;
}

const initialState: AttendanceState = {
  reflush: false,
  punch_record: [],
  cur_sign_in_type: new Date().getHours() < 14 ? 0 : 1, // 0: 上班, 1: 下班
};

export const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setPunchRecord(state, action: PayloadAction<PunchRecord>) {
      state.punch_record = action.payload;
    },
    addPunchRecord(state, action: PayloadAction<{ index: number; record: PunchRecord[number] }>) {
      state.punch_record[action.payload.index] = action.payload.record;
    },
    setReflush(state, action: PayloadAction<boolean>) {
      state.reflush = action.payload;
    }
  },
});

export const { setPunchRecord, addPunchRecord, setReflush } = attendanceSlice.actions;
