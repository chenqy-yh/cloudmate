import { makeErrorMsg } from "@/utils/error";
import http from "./request";
import { GET_SUCCESS, POST_SUCCESS } from "./constants";

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

export const clearUnreadCount = async (contact_id: string) => {
  const res = await http.post(`/chat/unread/clear`, {
    contact_id,
  });
  switch (res.statusCode) {
    case POST_SUCCESS:
      return res.data;
    case 401:
      throw makeErrorMsg("[无权限]清除未读消息", res.data);
    default:
      throw makeErrorMsg("清除未读消息失败", res.data);
  }
}
