import { makeErrorMsg } from "@/utils/error";
import http from "./request";
import { GET_SUCCESS } from "./constants";

export const getContacts = async () => {
  return await http.get('/user/contacts');
}


export const getPrivateContactTimeRange = async (contactId: string) => {
  const res = await http.get(`/chat/${contactId}/time-range`);
  switch (res.statusCode) {
    case GET_SUCCESS:
      return res.data as { _id: string }[];
    case 401:
      throw makeErrorMsg("[无权限]获取时间范围", res.data);
    default:
      throw makeErrorMsg("获取时间范围失败", res.data);
  }
}
