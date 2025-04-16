import { base_ip, port } from '@/constants/http';
import { makeErrorMsg } from '@/utils/error';
import Taro from '@tarojs/taro';
import { POST_SUCCESS } from './constants';
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
