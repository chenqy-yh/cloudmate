import { APPROVAL_PROCESS } from "./constants";

export const process_list = [
  {
    title: "待处理的",
    tag: "待处理",
    value: APPROVAL_PROCESS.PENDING,
  },
  {
    title: "我处理的",
    tag: "已处理",
    value: APPROVAL_PROCESS.PROCESSED,
  },
  {
    title: "已发起的",
    tag: "已发起",
    value: APPROVAL_PROCESS.INITIATED
  },
  {
    title: "我收到的",
    tag: "我收到的",
    value: APPROVAL_PROCESS.RECEIVED
  },
];
