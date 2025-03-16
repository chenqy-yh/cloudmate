import React from "react";

type AttendanceContextType = {
  cur_sign_in_type: number;
  punch_record: PunchRecord;
  setPunchRecord: React.Dispatch<React.SetStateAction<PunchRecord>>;
};

export const AttendanceContext = React.createContext<AttendanceContextType | null>(
  null
);
