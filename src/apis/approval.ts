import { base_ip, port } from '@/constants/http'
import { ApprovalType } from '@/pages/approval/types'
import { makeErrorMsg } from '@/utils/error'
import Taro from '@tarojs/taro'
import { GET_SUCCESS, POST_SUCCESS } from './constants'
import http from './request'

interface FileItem {
  path: string
  size: number
}

export interface File {
  url: string
  file?: FileItem
}

export const getWorkflowParticipants = () => {
  return http.get('/approval/getWorkflowParticipants')
}

export const createApproval = async (type: ApprovalType, dto) => {
  const res = await http.post(`/approval/create/${type.toLowerCase()}`, { dto })
  if (res.statusCode !== POST_SUCCESS) {
    if (res.statusCode === 400) {
      throw makeErrorMsg(res.data.message[0], res.data);
    }
    throw makeErrorMsg("创建审批失败", res.data);
  }
  return res;
}

export const queryApprovalListByProcess = async (process) => {
  const res = await http.get(`/approval/queryApprovalList/${process}`)
  if (res.statusCode !== GET_SUCCESS) {
    if (res.statusCode === 400) {
      throw makeErrorMsg(res.data, res.data);
    }
    throw makeErrorMsg("获取审批列表失败", res.data);
  }
  return res;
}

export const queryApprovalDetail = async (type, ap_code) => {
  const res = await http.get(`/approval/queryApprovalDetail`, {
    code: ap_code,
    type: type
  })
  if (res.statusCode !== GET_SUCCESS) {
    if (res.statusCode === 400) {
      throw makeErrorMsg(res.data, res.data);
    }
    throw makeErrorMsg("获取审批详情失败", res.data);
  }
  return res;
}

export const queryApprovalBaseInfo = async (ap_code) => {
  const res = await http.get(`/approval/queryApprovalBaseInfo`, {
    code: ap_code
  })
  if (res.statusCode !== GET_SUCCESS) {
    if (res.statusCode === 400) {
      throw makeErrorMsg(res.data, res.data);
    }
    throw makeErrorMsg("获取审批基本信息失败", res.data);
  }
  return res.data;
}

export const uploadAttchment = (file: File): Promise<UploadFileResult> => {
  return new Promise((resolve, reject) => {
    Taro.uploadFile({
      url: `http://${base_ip}:${port}/approval/upload/attachments`,
      filePath: file.url,
      name: 'file',
      header: http.getHeaderConfig(),
      success(res) {
        if (res.statusCode !== POST_SUCCESS) {
          reject(makeErrorMsg("上传附件失败", res.data));
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

export const approve = async (ap_code) => {
  const res = await http.post(`/approval/approve`, {
    approval_code: ap_code
  })
  if (res.statusCode !== POST_SUCCESS) {
    if (res.statusCode === 400) {
      throw makeErrorMsg(res.data.message, res.data);
    }
    throw makeErrorMsg("审批失败", res.data);
  }
  return res;
}

export const reject = async (ap_code) => {
  const res = await http.post(`/approval/reject`, {
    approval_code: ap_code
  })
  if (res.statusCode !== POST_SUCCESS) {
    if (res.statusCode === 400) {
      throw makeErrorMsg(res.data.message, res.data);
    }
    throw makeErrorMsg("审批失败", res.data);
  }
  return res;
}
