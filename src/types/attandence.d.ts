type PunchRecordItem = {
  time: Date,
  location: string,
  day: number,
  sign_in_type: number
}

type PunchRecord = (PunchRecordItem | null)[]


