import { base_ip, port } from '@/constants/http';
import { makeErrorMsg } from '@/utils/error';
import Taro from '@tarojs/taro';
import { GET_SUCCESS, POST_SUCCESS } from './constants';
import http from './request';

export const uploadImage = (url: string): Promise<UploadFileResult> => {
  return new Promise((resolve, reject) => {
    Taro.uploadFile({
      url: `http://${base_ip}:${port}/chat/upload/image`,
      filePath: url,
      name: 'file',
      header: http.getHeaderConfig(),
      success(res) {
        if (res.statusCode !== POST_SUCCESS) {
          reject(makeErrorMsg("上传图片失败", res.data));
          return;
        }
        if (typeof res.data === 'string') {
          resolve(JSON.parse(res.data) as UploadFileResult)
          return;
        }
        resolve(res.data as UploadFileResult)
      },
      fail(err) {
        reject(makeErrorMsg("上传附件失败", err));
      }
    })
  })
}

export const loadHistory = async (options: {
  receiver: string;
  limit?: number
  anchor_msg_id?: string;
}): Promise<PrivateMessageItem[]> => {
  const { receiver, anchor_msg_id, limit = 20 } = options
  const res = await http.post(`/chat/history/private/${receiver}`, {
    query: {
      limit,
      anchor_msg_id,
    }
  });
  switch (res.statusCode) {
    case POST_SUCCESS:
      return res.data;
    default:
      throw makeErrorMsg("获取历史消息失败", res.data);
  }
}

export const getUnreadCount = async () => {
  const res = await http.get('/chat/unread/count')
  switch (res.statusCode) {
    case GET_SUCCESS:
      return res.data;
    default:
      throw makeErrorMsg("获取未读消息数量失败", res.data);
  }
}
