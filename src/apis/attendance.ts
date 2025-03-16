import http from './request'

export const punch = async (lat: number, lng: number) =>
  await http.post<PunchRecordItem>('/attendance/punch', {
    lat, lng
  })


export const getPunchRecord = (day: number) =>
  http.get<PunchRecord>('/attendance/punch_record', {
    day
  })

