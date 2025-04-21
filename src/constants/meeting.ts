export enum MeetingLevel {
  LOW = 1,
  MIDDLE = 2,
  HIGH = 3,
}

export const meeting_level_to_cn = {
  [MeetingLevel.LOW]: "简会",
  [MeetingLevel.MIDDLE]: "常规",
  [MeetingLevel.HIGH]: "重要",
}

export const meeting_level_to_en = {
  [MeetingLevel.LOW]: "low",
  [MeetingLevel.MIDDLE]: "middle",
  [MeetingLevel.HIGH]: "high",
}
