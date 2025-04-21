import { makeErrorMsg } from '@/utils/error';
import { GET_SUCCESS, POST_SUCCESS } from './constants'
import http from './request'

export const createMeeting = async (dto) => {
  const res = await http.post('/schedule/meeting/create', { dto })
  switch (res.statusCode) {
    case POST_SUCCESS:
      return res.data;
    default:
      throw makeErrorMsg(res.data, res.data);
  }
}

export const getMeetingList = async (year, month) => {
  const res = await http.get(`/schedule/meeting/list/${year}/${month}`)
  switch (res.statusCode) {
    case GET_SUCCESS:
      return res.data as MeetingEntity[];
    default:
      throw makeErrorMsg(res.data, res.data);
  }
}

export const getMeetingDetail = async (mid) => {
  const res = await http.get(`/schedule/meeting/detail/${mid}`)
  switch (res.statusCode) {
    case GET_SUCCESS:
      return res.data as MeetingEntity;
    default:
      throw makeErrorMsg(res.data, res.data);
  }
}
