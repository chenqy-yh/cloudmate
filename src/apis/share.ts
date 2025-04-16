import { makeErrorMsg } from '@/utils/error'
import { base_ip, port } from '@/constants/http'
import Taro from '@tarojs/taro'
import http from './request'
import { GET_SUCCESS, POST_SUCCESS } from './constants'


export const getFileList = async (prefix) => {
  const res = await http.get<FileItem[]>('/share/fileList', { prefix })
  switch (res.statusCode) {
    case GET_SUCCESS:
      return res;
    case 401:
      throw makeErrorMsg("[无权限]查看文件列表", res.data);
    case 403:
      throw makeErrorMsg("[无权限]查看文件列表", res.data);
    default:
      throw makeErrorMsg("获取文件列表失败", res.data);
  }
}


export const getFileDownloadUrl = async (prefix) => {
  const res = await http.get<string>('/share/getFileDownloadUrl', { prefix })
  switch (res.statusCode) {
    case GET_SUCCESS:
      return res;
    case 401:
      throw makeErrorMsg("[无权限]获取文件下载链接", res.data);
    case 403:
      throw makeErrorMsg("[无权限]获取文件下载链接", res.data);
    default:
      throw makeErrorMsg("获取文件下载链接失败", res.data);
  }
}

export const createDirectory = async (prefix, key) => {
  const res = await http.post<boolean>('/share/createFolder', {
    prefix, key,
  })

  switch (res.statusCode) {
    case POST_SUCCESS:
      return res;
    case 401:
      throw makeErrorMsg("[无权限]创建文件夹", res.data);
    case 403:
      throw makeErrorMsg("[无权限]创建文件夹", res.data);
    default:
      throw makeErrorMsg("创建文件夹失败", res.data);
  }
}

export const moveFile = async (source, target) => {
  const res = await http.post<boolean>('/share/moveFile', {
    source, target,
  })

  switch (res.statusCode) {
    case POST_SUCCESS:
      return res;
    case 401:
      throw makeErrorMsg("[无权限]移动文件", res.data);
    case 403:
      throw makeErrorMsg("[无权限]移动文件", res.data);
    default:
      throw makeErrorMsg("移动文件失败", res.data);
  }
}

export const deleteFile = async (key) => {
  const res = await http.post<boolean>('/share/delFile', { key })

  switch (res.statusCode) {
    case POST_SUCCESS:
      return res;
    case 401:
      throw makeErrorMsg("[无权限]删除文件", res.data);
    case 403:
      throw makeErrorMsg("[无权限]删除文件", res.data);
    default:
      throw makeErrorMsg("删除文件失败", res.data);
  }
}

export const deleteFolder = async (prefix) => {
  const res = await http.post<boolean>('/share/delFolder', { prefix });

  switch (res.statusCode) {
    case POST_SUCCESS:
      return res;
    case 401:
      throw makeErrorMsg("[无权限]删除文件夹", res.data);
    case 403:
      throw makeErrorMsg("[无权限]删除文件夹", res.data);
    default:
      throw makeErrorMsg("删除文件夹失败", res.data);
  }
}

export const uploadFile = async (file_path, prefix, key) => {
  const res_promise = new Promise((resolve, reject) => {
    Taro.uploadFile({
      url: `http://${base_ip}:${port}/share/uploadFile`,
      filePath: file_path,
      name: "file",
      formData: { prefix, key },
      header: http.getHeaderConfig(),
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    });
  }) as Taro.UploadTask.UploadTaskPromise;

  const res = await res_promise;

  switch (res.statusCode) {
    case POST_SUCCESS:
      return res;
    case 401:
      throw makeErrorMsg("[无权限]上传文件", res.data);
    case 403:
      throw makeErrorMsg("[无权限]上传文件", res.data);
    default:
      throw makeErrorMsg("上传文件失败", res.data);
  }
}

